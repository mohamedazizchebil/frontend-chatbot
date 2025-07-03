'use client';

import { useState, useEffect } from "react";
import Chatbutton from "./components/ChatButton";

export default function Home() {
  const appId = "ecommerce-site";
  const [currentPageType, setCurrentPageType] = useState("produit");
  const [productName, setProductName] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (currentPageType !== "produit") return;

    const element = document.getElementById("product-name");
    if (element) {
      setProductName(element.textContent);

      const observer = new MutationObserver(() => {
        setProductName(element.textContent);
      });

      observer.observe(element, { childList: true, characterData: true, subtree: true });

      return () => observer.disconnect();
    }
  }, [currentPageType]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Bienvenue sur notre site e-commerce</h1>

      {/* Exemple d'élément contenant le nom du produit */}
      {currentPageType === "produit" && (
        <span id="product-name">
          Jet'up Bureau Vallée - Papier blanc - A4 (210 x 297 mm) - 80 g/m² - 2500 feuilles (carton de 5 ramettes) 
        </span>
      )}

      <Chatbutton
        appId={appId}
        pageType={currentPageType}
        pageSpecificData={currentPageType === "produit" ? { productName } : null}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
