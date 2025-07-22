'use client';


import React, { useState, useEffect, useRef } from 'react';

import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import OptionsList from './OptionsList';
import ChatInput from './ChatInput';
import useChatInitialisation from '../hooks/useChatInitialisation';
import useChatActions from '../hooks/useChatActions';
import useSearchHandler from '../hooks/useSearchHandler';


//const CHATBOT_BACKEND_URL = 'https://e-commerce-chatbot-n039.onrender.com/api/chat';
const CHATBOT_BACKEND_URL = 'http://localhost:3001/api';


export default function ChatWidget({ isOpen, setIsOpen, appId, pageType, pageSpecificData }) {

  const dialogueKey = `${appId}_${pageType}`;


  const [messages, setMessages] = useState([]);
    // État pour stocker les options actuelles à afficher à l'utilisateur
    const [currentOptions, setCurrentOptions] = useState([]);
   

    // Refs pour faire défiler automatiquement la conversation vers le bas
    const messagesEndRef = useRef(null);

    // Nouveaux états pour stocker la configuration de dialogue complète reçue du backend
    // et l'étape de dialogue actuellement affichée par le chatbot.
    const [fullDialogueConfig, setFullDialogueConfig] = useState(null);
    const [currentDialogueStep, setCurrentDialogueStep] = useState(null); // L'objet de l'étape de dialogue actuellement affichée
    const [showSearchInput, setShowSearchInput] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);



    // Fonction pour faire défiler les messages vers le bas
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
   



    // Effet pour faire défiler la conversation à chaque nouveau message
    useEffect(() => {
        setTimeout(() => scrollToBottom(), 100);
    }, [messages]);


// Utilisation du hook personnalisé pour initialiser le chatbot
useChatInitialisation({
  appId,
  pageType ,
  dialogueKey,
  setMessages,
  setCurrentDialogueStep,
  setCurrentOptions,
  setFullDialogueConfig
});







const { sendMessage, handleOptionClick } = useChatActions({
  appId,
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
});







  // Gère la soumission du formulaire de recherche
  const {handleSearchSubmit}= useSearchHandler({
    appId,
    messages,
    setMessages,
    userInput,
    setUserInput,
    setIsThinking,
    setShowSearchInput,
    setCurrentOptions,
    dialogueKey
  });
  



  return (
   <div className="relative">
  <div className="fixed bottom-24 right-4 w-80 bg-white rounded-lg shadow-lg border z-50 flex flex-col">
    
    {/* Header */}
    <ChatHeader />

    {/* Messages */}

    <ChatMessages messages={messages} isThinking={isThinking} messagesEndRef={messagesEndRef} />


    {/* Options */}
    {currentOptions.length > 0 && (
      <OptionsList options={currentOptions} onOptionClick={handleOptionClick} />
    )}
    {/* Input text pour la recherche produit */}
{showSearchInput && (
  <ChatInput userInput={userInput} setUserInput={setUserInput} onSubmit={handleSearchSubmit} />

)}

    

  </div>
  

</div>





  );


}