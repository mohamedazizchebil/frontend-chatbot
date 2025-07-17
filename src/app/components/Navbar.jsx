'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('appid');
    router.push('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-3">
          <Image
            src="/chatbot.jpg"
            width={40}
            height={40}
            alt="Logo"
            className="rounded-full"
          />
          <span className="text-2xl font-bold text-gray-900">Aidea</span>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">
            E-commerce Bot
          </span>
        </div>

        <div className="flex items-center gap-8 text-gray-700 font-medium">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/elasticconfig">Configuration Elasticsearch</Link>
          <Link href="/dashboard/mesdialogues">Mes Dialogues</Link>
          <button
            className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition font-semibold"
            onClick={handleLogout}
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </nav>
  );
}
