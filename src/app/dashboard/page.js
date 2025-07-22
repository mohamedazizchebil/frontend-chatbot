"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchWithAuth } from "../utils/fetchWithAuth";

export default function Dashboard() {
  const router = useRouter();
  const [appId, setAppId] = useState(null);
  const [loading, setLoading] = useState(true);
  const CHATBOT_BACKEND_URL = 'https://e-commerce-chatbot-n039.onrender.com/api';

 

  useEffect(() => {
    const token = localStorage.getItem("token");
    const appid = localStorage.getItem("appid");

    if (!token) {
      router.push("/login");
    } else {
      setAppId(appid);
      setLoading(false);
    }
  }, [router]);


  return (
    <>
     

      {/* Main */}
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Welcome */}
          <div className="bg-white p-8 rounded-xl shadow">
            <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
               Bienvenue sur le Dashboard
            </h1>
            <p className="text-center text-gray-700">
              Voici votre <strong>App ID</strong> :
              <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-md font-mono text-sm">
                {appId}
              </span>
            </p>
          </div>

       
 




  {/* Bloc Code d’intégration */}
  <div className="bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold mb-4 text-blue-600"> Code d’intégration du Widget</h2>

  <p className="text-sm text-gray-600 mb-4">
    Copiez le code HTML ci-dessous et collez-le dans la structure de votre page (généralement dans le fichier
    <code className="bg-gray-200 px-1 rounded text-xs mx-1">&lt;head&gt;</code> et
    <code className="bg-gray-200 px-1 rounded text-xs mx-1">&lt;body&gt;</code>). Ce widget affichera un chatbot configuré pour votre application.
  </p>

  <div className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm font-mono text-gray-800">
    <code>
{`<head>
  <link rel="stylesheet" href="https://frontend-chatbot-u6tn.vercel.app/chatbot.css" />
</head>
<body>
  <chat-widget
    appid="${appId}"
    pagetype="<TYPE DE LA PAGE>"
    pagespecificdata='{"productName": "<NOM DU PRODUIT>"}'>
  </chat-widget>

  <script src="https://frontend-chatbot-u6tn.vercel.app/chat-widget.js"></script>
</body>`}
    </code>
  </div>

  <button
    onClick={() => {
      const code = `<head>
  <link rel="stylesheet" href="https://frontend-chatbot-u6tn.vercel.app/chatbot.css" />
</head>
<body>
  <chat-widget
    appid="${appId}"
    pagetype="<TYPE DE LA PAGE>"
    pagespecificdata='{"productName": "<NOM DU PRODUIT>"}'>
  </chat-widget>

  <script src="https://frontend-chatbot-u6tn.vercel.app/chat-widget.js"></script>
</body>`;
      navigator.clipboard.writeText(code);
      alert("Code copié dans le presse-papiers !");
    }}
    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
  >
     Copier le code
  </button>
</div>
<div className="bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold mb-4 text-blue-600">Configuration Elasticsearch</h2>
  <p className="text-sm text-gray-700 mb-4">
    Configurez Elasticsearch pour activer la recherche intelligente dans votre chatbot.
  </p>

  <button
    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
  >
    <Link href="/dashboard/elasticconfig">Voir | Modifier la configuration</Link>
    
  </button>
</div>

{/* Configuration des Dialogues */}
<div className="bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold mb-4 text-blue-600">Configuration des Dialogues</h2>
  <p className="text-sm text-gray-700 mb-4">
    Configurez les dialogues du chatbot pour offrir une expérience personnalisée sur chaque page de votre site.
  </p>

  <button
    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
  >
    <Link href="/dashboard/mesdialogues">
      Gérer les Dialogues
    </Link>
  </button>
</div>
    
 
</div>


      </main>

      
    </>
  );
}
