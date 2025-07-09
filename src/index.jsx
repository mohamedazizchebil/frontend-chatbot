import React from 'react';
import ReactDOM from 'react-dom/client';
import reactToWebComponent from 'react-to-webcomponent';
import './app/globals.css';
import Chatbutton from './app/components/ChatButton.jsx';

// Wrapper to parse and map props from HTML attributes
function WidgetWrapper(props) {
  // Properly map lowercase HTML attributes to React props
  const appId = props.appid || props.appId;
  const pageType = props.pagetype || props.pageType;

  // Handle pageSpecificData (parse if string)
  let pageSpecificData = props.pagespecificdata || props.pageSpecificData;
  if (typeof pageSpecificData === 'string') {
    try {
      pageSpecificData = JSON.parse(pageSpecificData);
    } catch (err) {
      console.error("❌ Failed to parse pageSpecificData:", pageSpecificData);
      pageSpecificData = {};
    }
  }

  const rawIsOpen = props.isopen ?? props.isOpen;
  const isOpen = rawIsOpen === 'true' || rawIsOpen === true;

  

  return (
    <Chatbutton
      appId={appId}
      pageType={pageType}
      pageSpecificData={pageSpecificData}
      isOpen={rawIsOpen !== undefined ? isOpen : undefined}
    />
  );
}

// Register the custom element
if (!customElements.get('chat-widget')) {
  const WebChatWidget = reactToWebComponent(WidgetWrapper, React, ReactDOM, {
    shadow: false, 
    props: ['appid', 'pagetype', 'pagespecificdata', 'isopen', 'setisopen'],
  });
  customElements.define('chat-widget', WebChatWidget);
}
