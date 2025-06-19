'use client';

import Message from './Message';
import React, { useState, useEffect, useRef } from 'react';


// URL de votre API Backend (assurez-vous qu'elle correspond à votre configuration)
const CHATBOT_BACKEND_URL = process.env.NEXT_PUBLIC_CHATBOT_BACKEND_URL;



export default function ChatWidget({ isOpen, setIsOpen, appId, pageType, pageSpecificData }) {

  const dialogueKey = `${appId}_${pageType}_${pageSpecificData?.productId || 'default'}`;


  const [messages, setMessages] = useState([]);
    // État pour stocker les options actuelles à afficher à l'utilisateur
    const [currentOptions, setCurrentOptions] = useState([]);
    // État pour stocker l'ID de session (persisté localement)
    const [sessionId, setSessionId] = useState(null);

    // Refs pour faire défiler automatiquement la conversation vers le bas
    const messagesEndRef = useRef(null);

    // Nouveaux états pour stocker la configuration de dialogue complète reçue du backend
    // et l'étape de dialogue actuellement affichée par le chatbot.
    const [fullDialogueConfig, setFullDialogueConfig] = useState(null);
    const [currentDialogueStep, setCurrentDialogueStep] = useState(null); // L'objet de l'étape de dialogue actuellement affichée

    // Fonction pour faire défiler les messages vers le bas
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
   



    // Effet pour faire défiler la conversation à chaque nouveau message
    useEffect(() => {
        scrollToBottom();
    }, [messages]);




useEffect(() => {
  const initializeChatbot = async () => {
    const storedSessionId = localStorage.getItem(`${dialogueKey}_sessionId`);

    // 1. Si une session est stockée → vérifie avec le backend
    if (storedSessionId) {
      try {
        const checkRes = await fetch(`${CHATBOT_BACKEND_URL}/check-session`, {
          method: 'POST',
          credentials: 'include'
        });

        if (checkRes.status === 401) {
          console.warn("⚠️ Session expirée");
          // Efface les données obsolètes
          localStorage.removeItem(`${dialogueKey}_sessionId`);
          localStorage.removeItem(`${dialogueKey}_messages`);
          localStorage.removeItem(`${dialogueKey}_currentDialogueStep`);
          localStorage.removeItem(`${dialogueKey}_fullDialogueConfig`);
        }
      } catch (err) {
        console.error("❌ Erreur lors de la vérification de session:", err);
      }
    }

    // 2. Recharge l'état depuis localStorage si encore valide
    const storedDialogueConfig = localStorage.getItem(`${dialogueKey}_fullDialogueConfig`);
    const storedStep = localStorage.getItem(`${dialogueKey}_currentDialogueStep`);
    const storedMessages = localStorage.getItem(`${dialogueKey}_messages`);
    const validSessionId = localStorage.getItem(`${dialogueKey}_sessionId`);

    if (storedDialogueConfig && storedStep && storedMessages && validSessionId) {
      const parsedStep = JSON.parse(storedStep);
      setFullDialogueConfig(JSON.parse(storedDialogueConfig));
      setCurrentDialogueStep(parsedStep);
      setMessages(JSON.parse(storedMessages));
      setCurrentOptions(parsedStep.options);
      setSessionId(validSessionId);
      console.log("✅ État restauré depuis localStorage");
      return;
    }

    // 3. Si aucune session valide → nouvelle initialisation
    try {
      const response = await fetch(`${CHATBOT_BACKEND_URL}/init`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appId, pageType, pageSpecificData }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!data.initialDialogueConfig) {
        setMessages([{ type: 'bot', content: [{ type: 'text', content: data.errorMessage || "Chatbot indisponible." }] }]);
        return;
      }

      const initialStep = data.initialDialogueConfig.dialogue[0];

      localStorage.setItem(`${dialogueKey}_sessionId`, data.sessionId);
      localStorage.setItem(`${dialogueKey}_fullDialogueConfig`, JSON.stringify(data.initialDialogueConfig));
      localStorage.setItem(`${dialogueKey}_currentDialogueStep`, JSON.stringify(initialStep));
      localStorage.setItem(`${dialogueKey}_messages`, JSON.stringify([
        { type: 'bot', content: [{ type: 'text', content: initialStep.question }] }
      ]));

      setSessionId(data.sessionId);
      setFullDialogueConfig(data.initialDialogueConfig);
      setCurrentDialogueStep(initialStep);
      setMessages([{ type: 'bot', content: [{ type: 'text', content: initialStep.question }] }]);
      setCurrentOptions(initialStep.options);
    } catch (error) {
      console.error("❌ Erreur d'initialisation:", error);
      setMessages([{ type: 'bot', content: [{ type: 'text', content: "Erreur lors du chargement du chatbot." }] }]);
    }
  };

  initializeChatbot();
}, [appId, pageType, pageSpecificData]);








const sendMessage = async (messageText, selectedOption = null) => {
  const updatedMessages = [
    ...messages,
    { type: 'user', content: [{ type: 'text', content: messageText }] }
  ];

  setMessages(updatedMessages);
  localStorage.setItem(`${dialogueKey}_messages`, JSON.stringify(updatedMessages));
  setCurrentOptions([]);

  let nextDialogueStep = null;
  let actionToPerform = null;

  if (selectedOption) {
    if (selectedOption.next && selectedOption.next.length > 0) {
      nextDialogueStep = selectedOption.next[0];
    } else if (selectedOption.action) {
      actionToPerform = selectedOption;
    }
  }

  if (nextDialogueStep) {
    const updatedMessagesWithBot = [
      ...updatedMessages,
      { type: 'bot', content: [{ type: 'text', content: nextDialogueStep.question }] }
    ];

    setMessages(updatedMessagesWithBot);
    localStorage.setItem(`${dialogueKey}_messages`, JSON.stringify(updatedMessagesWithBot));

    setCurrentDialogueStep(nextDialogueStep);
    localStorage.setItem(`${dialogueKey}_currentDialogueStep`, JSON.stringify(nextDialogueStep));

    setCurrentOptions(nextDialogueStep.options);
  } else if (actionToPerform) {
    const botResponseAfterAction = `D'accord, je vais ${actionToPerform.label.toLowerCase()}.`;

    const newBotMessages = [
      { type: 'bot', content: [{ type: 'text', content: botResponseAfterAction }] },
      { type: 'bot', content: [{ type: 'text', content: "Y a-t-il autre chose que je puisse faire pour vous ?" }] }
    ];

    const updated = [...updatedMessages, ...newBotMessages];

    setMessages(updated);
    localStorage.setItem(`${dialogueKey}_messages`, JSON.stringify(updated));
    setCurrentOptions(currentDialogueStep.options);

    // action handlers
    switch (actionToPerform.action) {
      case 'redirect':
        if (actionToPerform.url) {
          const processedUrl = actionToPerform.url.replace('{{product_id}}', pageSpecificData?.productId || '');
          window.location.href = processedUrl;
        }
        break;
      case 'semantic_search':
        let prompt = actionToPerform.prompt;
        if (pageSpecificData?.productName) {
          prompt = prompt.replace('{{product_name}}', pageSpecificData.productName);
        }
        alert(`Recherche : ${prompt}`);
        break;
      case 'contact_agent':
        alert('Un agent vous contactera.');
        break;
      case 'open_livechat':
        alert('Chat en direct ouvert.');
        break;
      default:
        alert('Action non gérée.');
    }
  } else {
    const fallbackDialogue = fullDialogueConfig?.dialogue.find(d => d.pageType === 'general_fallback');
    if (fallbackDialogue && fallbackDialogue.dialogue?.length) {
      const fallbackStep = fallbackDialogue.dialogue[0];
      const updated = [
        ...updatedMessages,
        { type: 'bot', content: [{ type: 'text', content: "Désolé, je n'ai pas compris." }] },
        { type: 'bot', content: [{ type: 'text', content: fallbackStep.question }] }
      ];
      setMessages(updated);
      localStorage.setItem(`${dialogueKey}_messages`, JSON.stringify(updated));

      setCurrentDialogueStep(fallbackStep);
      localStorage.setItem(`${dialogueKey}_currentDialogueStep`, JSON.stringify(fallbackStep));

      setCurrentOptions(fallbackStep.options);
    } else {
      const fallback = [
        ...updatedMessages,
        { type: 'bot', content: [{ type: 'text', content: "Désolé, je n'ai pas compris et aucune réponse n'est prévue." }] }
      ];
      setMessages(fallback);
      localStorage.setItem(`${dialogueKey}_messages`, JSON.stringify(fallback));
      setCurrentOptions([]);
    }
  }
};

  
    // Gère le clic sur un bouton d'option
    const handleOptionClick = (option) => {
        sendMessage(option.label, option); // Passe le label et l'objet option complet
    };


  return (
   <div className="relative">
  <div className="fixed bottom-24 right-4 w-80 bg-white rounded-lg shadow-lg border z-50 flex flex-col">
    
    {/* Header */}
    <div className="bg-blue-500 text-white px-3 py-2 rounded-t-lg flex items-center gap-2">
      <span className="font-semibold">Assistant</span>
    </div>

    {/* Messages */}
    <div className="p-4 max-h-96 overflow-y-auto text-sm flex flex-col space-y-2" role="log" aria-live="polite">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.type}`}>
          {msg.content.map((part, partIndex) => (
            <Message
              key={partIndex}
              text={part.content}
              role={msg.type}
            />
          ))}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>

    {/* Options */}
    {currentOptions.length > 0 && (
      <div className="p-4 flex flex-col space-y-2">
        {currentOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className="w-full text-left px-2 py-2 bg-blue-500 text-white hover:bg-blue-600 "
            >
            {option.label}
          </button>
        ))}
      </div>
    )}

    

  </div>
</div>





  );

};
