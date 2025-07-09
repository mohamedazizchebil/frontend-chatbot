import { useCallback } from 'react';

//const CHATBOT_BACKEND_URL = 'https://e-commerce-chatbot-n039.onrender.com/api';
const CHATBOT_BACKEND_URL = 'http://localhost:3001/api';

export default function useChatActions({
  messages,
  setMessages,
  setCurrentOptions,
  fullDialogueConfig,
  currentDialogueStep,
  setCurrentDialogueStep,
  setShowSearchInput,
  dialogueKey,
  pageType,
  pageSpecificData

}) {
  const sendMessage = useCallback(async (messageText, selectedOption = null) => {
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
      console.log("👉 Option sélectionnée :", selectedOption);
      if (selectedOption.action === 'semantic_search') {
        actionToPerform = selectedOption;
      }
      else if(selectedOption.action === 'similar_product_search') {
        actionToPerform = selectedOption;
      }
      
      else if (selectedOption.next && selectedOption.next.length > 0) {
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
    } 
    
    
    
    else if (actionToPerform) {
      const newBotMessage = [
        {
          type: 'bot',
          content: [{ type: 'text', content: "Y a-t-il autre chose que je puisse faire pour vous ?" }]
        }
      ];

      const updated = [...updatedMessages, ...newBotMessage];
      setMessages(updated);
      localStorage.setItem(`${dialogueKey}_messages`, JSON.stringify(updated));
      setCurrentOptions(currentDialogueStep.options);

      const actionHandlers = {
        redirect: (url) => {
          window.open(url, '_blank', 'noopener,noreferrer');
        },
        semantic_search: () => {
          setShowSearchInput(true);
          setCurrentOptions([]);
          const prompt = {
            type: 'bot',
            content: [{ type: 'text', content: "Quel produit recherchez-vous ?" }]
          };
          const newMessages = [...updatedMessages, prompt];
          setMessages(newMessages);
          localStorage.setItem(`${dialogueKey}_messages`, JSON.stringify(newMessages));
        },
        contact_agent: () => alert('Un agent vous contactera.'),
        open_livechat: () => alert('Chat en direct ouvert.'),
        similar_product_search: async() => {
          console.log("✅ Action similaire déclenchée");
          if (!pageSpecificData || !pageSpecificData.productName) {
            alert('Aucun produit spécifique trouvé pour la recherche similaire.');
            return;
          }

          const newBotMessage=[
        {
          type: 'bot',
          content: [{ type: 'text', content: "Recherche de produits similaires en cours..." }]
        }
      ]
      const updated = [...updatedMessages, ...newBotMessage];
      setMessages(updated);
      localStorage.setItem(`${dialogueKey}_messages`, JSON.stringify(updated));
      
          if(pageType ==='produit'&& pageSpecificData && pageSpecificData.productName) {
            const productName = pageSpecificData.productName;
            const response = await fetch(`${CHATBOT_BACKEND_URL}/similair`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ nom: productName }),
            });
            const data = await response.json();

            const botResponse = {
        type: 'bot',
        content: data.length > 0
          ? data.map((product) => ({
              type: 'product',
              content: {
                nom: product.nom || 'Nom indisponible',
                description: product.description || 'Description indisponible',
                image: product.image || 'https://via.placeholder.com/150',
                lien: product.lien,
              },
            }))
          : [{ type: 'text', content: "Aucun produit trouvé." }]
      };
            const finalMessages = [...updatedMessages, botResponse];
            setMessages(finalMessages);
            localStorage.setItem(`${dialogueKey}_messages`, JSON.stringify(finalMessages));
            
          }
          else {
            alert('La recherche de produits similaires n\'est disponible que pour les pages de produits.');
          }
        }
      };


            

      if (actionToPerform.action in actionHandlers) {
        actionHandlers[actionToPerform.action](actionToPerform.url);
      } else {
        alert('Action non gérée.');
      }

    }
     else {
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
  }, [messages, currentDialogueStep, fullDialogueConfig ,pageType, pageSpecificData]);

  const handleOptionClick = (option) => {
    sendMessage(option.label, option);
  };

  return { sendMessage, handleOptionClick };
}
