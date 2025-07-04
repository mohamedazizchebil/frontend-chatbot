'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ChatWidget from '../components/ChatWidget';
import Chatbutton from '../components/ChatButton';

export default function ClientOnlyChatbot() {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(true);

  const appId = searchParams.get('appId') || 'default-app';
  const pageType = searchParams.get('pageType') || 'home';
  const productName = searchParams.get('productName');

  const pageSpecificData = productName ? { productName } : null;

  return (
    <Chatbutton
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      appId={appId}
      pageType={pageType}
      pageSpecificData={pageSpecificData}
    />
  );
}
