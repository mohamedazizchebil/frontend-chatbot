import { Suspense } from 'react';
import ClientOnlyChatbot from './ClientOnlyChatbot';

export default function ChatbotPage() {
  return (
    <div className="h-screen w-screen">
      <Suspense fallback={<div>Chargement du chatbot...</div>}>
        <ClientOnlyChatbot />
      </Suspense>
    </div>
  );
}
