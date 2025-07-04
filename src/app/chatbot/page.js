'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ChatWidget from '../components/ChatWidget';
import { Suspense } from 'react';

export default function ChatbotPage() {
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(true); // Ouvert par défaut

  const appId = searchParams.get('appId') || 'default-app';
  const pageType = searchParams.get('pageType') || 'home';
  const productName = searchParams.get('productName');

  const pageSpecificData = productName ? { productName } : null;

  return (
    <div className="h-screen w-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <ChatWidget
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          appId={appId}
          pageType={pageType}
          pageSpecificData={pageSpecificData}
        />
      </Suspense>
      
        
      </div>

    

  );
}
