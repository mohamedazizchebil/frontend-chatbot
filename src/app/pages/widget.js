'use client';

import { useSearchParams } from 'next/navigation';
import Chatbutton from '../components/ChatButton';
import ChatWidget from '../components/ChatWidget';

export default function WidgetPage() {
  const searchParams = useSearchParams();
  const appId = searchParams.get('appId');
  const pageType = searchParams.get('pageType');
  const productId = searchParams.get('productId');
  const productName = searchParams.get('productName');

  const pageSpecificData = { productId, productName };

  return (
    <ChatWidget
      isOpen={true}
      setIsOpen={() => {}}
      appId={appId}
      pageType={pageType}
      pageSpecificData={pageSpecificData}
    />
  );
}
