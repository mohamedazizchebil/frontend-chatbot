import React from "react";
import ReactDOM from "react-dom/client";
import Chatbutton from "./app/components/ChatButton";

// Fonction globale pour intégrer le chatbot dans n'importe quel site
window.renderChatbot = (props, domId = "Aidea-chatbot") => {
  const rootElement = document.getElementById(domId);
  if (!rootElement) {
    console.error(`Element with id "${domId}" not found.`);
    return;
  }
  const root = ReactDOM.createRoot(rootElement);
  root.render(<Chatbutton {...props} />);
};