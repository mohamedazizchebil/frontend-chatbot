import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatWidget from './app/components/ChatWidget';

const config = window.CHATBOT_CONFIG || {};
const appId = config.appId || 'default-app';
const pageType = config.pageType || 'home';
const productName = config.productName || '';

const container = document.createElement('div');
container.id = 'chatbot-container';
document.body.appendChild(container);

const root = ReactDOM.createRoot(container);

root.render(
  <ChatWidget
    appId={appId}
    pageType={pageType}
    pageSpecificData={pageType === 'produit' ? { productName } : null}
    isOpen={true}
    setIsOpen={() => {}}
  />
);
