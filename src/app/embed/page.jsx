'use client';

import Chatbutton from "../components/ChatButton";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EmbedPage() {
  const searchParams = useSearchParams();
  const [isReady, setIsReady] = useState(false);

  const appId = searchParams.get('appId') || 'default-app';
  const pageType = searchParams.get('pageType') || 'home';
  const productName = searchParams.get('productName');

  useEffect(() => {
    setIsReady(true); // pour éviter le rendering SSR
  }, []);

  if (!isReady) return null;

  return (
    <div className="w-full h-full fixed top-0 left-0">
      <Chatbutton
        appId={appId}
        pageType={pageType}
        pageSpecificData={pageType === 'produit' ? { productName } : null}
        isOpen={true}
        setIsOpen={() => {}}
      />
    </div>
  );
}
