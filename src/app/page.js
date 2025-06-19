'use client';

import { useState } from "react";
import { IoIosChatboxes } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import Chatbutton from "./components/ChatButton";
import ChatWidget from "./components/ChatWidget";

export default function Home() {
  const appId = "ecommerce-site";
  const [currentPageType, setCurrentPageType] = useState("produit");

  const pageSpecificData = {
    productId: "123",
    productName: "Super Widget"
  };

  // 👉 Contrôle de l'ouverture/fermeture du Chat
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      {/* Votre contenu principal */}
      <h1>Bienvenue sur notre site e-commerce</h1>

      {/* Bouton qui ouvre le ChatWidget */}
      <Chatbutton
        appId={appId}
        pageType={currentPageType}
        pageSpecificData={pageSpecificData}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Affichage conditionnel du ChatWidget */}
      {isOpen && (
        <ChatWidget
          appId={appId}
          pageType={currentPageType}
          pageSpecificData={pageSpecificData}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
}
