import Image from 'next/image';

export default function ChatHeader() {
  return (
    <div className="bg-blue-500 text-white px-3 py-2 rounded-t-lg flex items-center gap-2">
      <img
        src="chatbot.jpg"
        alt="Logo Aidea"
        width={26}
        height={26}
        className="rounded-full"
      />
      <span className="font-semibold">Aidea</span>
    </div>
  );
}
