// src/widget-entry.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import ChatWidget from './app/components/ChatWidget';

// Composant wrapper pour convertir les attributs HTML en props
const WrappedChatWidget = ({ 'app-id': appId, 'page-type': pageType, 'product-name': productName }) => {
  const cleanAppId = appId || 'default-app';
  const cleanPageType = pageType || 'home';
  const cleanProductName = productName || '';

  return (
    <ChatWidget
      appId={cleanAppId}
      pageType={cleanPageType}
      pageSpecificData={cleanPageType === 'produit' ? { productName: cleanProductName } : null}
      isOpen={true}
      setIsOpen={() => {}}
    />
  );
};

// Transformer en Web Component
const WebComponent = reactToWebComponent(WrappedChatWidget, React, ReactDOM,{ shadow: false });
customElements.define('chat-widget', WebComponent);
