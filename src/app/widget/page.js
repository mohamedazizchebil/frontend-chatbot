'use client';
import { useSearchParams } from 'next/navigation';
import ChatWidget from '../components/ChatWidget';

export default function WidgetPage() {
  const params = useSearchParams();

  const appId = params.get('appId') || 'default-app';
  const pageType = params.get('pageType') || 'default-page';
  const productId = params.get('productId') || '';
  const productName = params.get('productName') || '';

  const pageSpecificData = {
    productId,
    productName,
  };

  return (
    <div style={{ padding: 10 }}>
      <ChatWidget
        appId={appId}
        pageType={pageType}
        pageSpecificData={pageSpecificData}
        isOpen={true}
        setIsOpen={() => {}}
      />
    </div>
  );
}
