'use client';

import { useState } from "react";
import { IoIosChatboxes } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import ChatWidget from "./ChatWidget";

export default function Chatbutton({appId, pageType, pageSpecificData}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      
      <div className={`transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <ChatWidget
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          appId={appId}
          pageType={pageType}
          pageSpecificData={pageSpecificData}
        />
      </div>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer shadow-lg z-50"
      >
        {isOpen ? (
          <IoMdClose className="text-white text-3xl" />
        ) : (
          <IoIosChatboxes className="text-white text-3xl" />
          
        )}
      </div>
    </>
  );
}
