"use client"
import {
  HiShoppingCart,
  HiCog,
  HiLightningBolt,
  HiChatAlt2,
} from "react-icons/hi"

import { FaRobot } from "react-icons/fa6";
import { GoIterations } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
export default function HomePage() {

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900"> 
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
  <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
    {/* Logo */}
    <div className="flex items-center gap-3">
      <Image
        src="/chatbot.jpg"
        width={48}
        height={48}
        alt="Logo"
        className="rounded-full"
      />
      <span className="text-2xl font-bold text-gray-900">Aidea</span>
      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">
        E-commerce Bot
      </span>
    </div>

    {/* Navigation links */}
    <div className="hidden sm:flex items-center gap-6 text-gray-600 font-medium">
      <a href="#features" className="hover:text-blue-600 transition-colors duration-200">
        Fonctionnalités
      </a>
      <a href="#pricing" className="hover:text-blue-600 transition-colors duration-200">
        Tarifs
      </a>
      <a href="#demo" className="hover:text-blue-600 transition-colors duration-200">
        Démo
      </a>
    </div>

    {/* Buttons */}
    <div className="flex gap-4">
  <button className="bg-transparent border border-blue-600 text-blue-600 font-semibold px-6 py-3 rounded-lg">
    <Link href="/login">Connexion</Link>
  
</button>

  <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 hover:shadow-md transition duration-200">
    
    <Link href="/register">Essai gratuit</Link>
  </button>
</div>
  </div>
</nav>


      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-24 px-6 max-w-4xl mx-auto animate-fade-in">
  <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
    Boostez vos ventes avec <span className="text-blue-600">Aidea</span>
  </h1>
  <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl">
    L'assistant intelligent pour votre site e-commerce : dialogues configurables, IA intégrée, recommandations personnalisées et support client 24/7.
  </p>
  <button
    className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
  >
    <Link href="/register">Commencer l'essai gratuit</Link>
  </button>
</header>


      {/* Features Section */}
      <section id="features" className="bg-sky-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <HiCog className="mx-auto mb-4 h-12 w-12 text-blue-600" />
            <h3 className="text-xl font-semibold mb-2">Dialogues Configurables</h3>
            <p className="text-gray-700">
              Créez des scénarios adaptés à chaque page de votre site, pour une expérience client personnalisée.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <FaRobot className="mx-auto mb-4 h-12 w-12 text-blue-600" />
            <h3 className="text-xl font-semibold mb-2">IA Intégrée</h3>
            <p className="text-gray-700">
              Profitez de l'intelligence artificielle pour des recommandations rapides et pertinentes.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <GoIterations className="mx-auto mb-4 h-12 w-12 text-blue-600" />
            <h3 className="text-xl font-semibold mb-2">Actions Finales</h3>
            <p className="text-gray-700">
              Recherches, recommandations et autres actions automatisées pour simplifier le parcours client.
            </p>
          </div>
          {/* Feature 4 */}
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <HiChatAlt2 className="mx-auto mb-4 h-12 w-12 text-blue-600" />
            <h3 className="text-xl font-semibold mb-2">Support Client 24/7</h3>
            <p className="text-gray-700">
              Réponses automatiques aux questions fréquentes, gestion sans intervention humaine.
            </p>
          </div>
          {/* Feature 5 */}
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <HiLightningBolt className="mx-auto mb-4 h-12 w-12 text-blue-600" />
            <h3 className="text-xl font-semibold mb-2">Rapidité & Efficacité</h3>
            <p className="text-gray-700">
              Infrastructure optimisée pour une expérience fluide et sans latence.
            </p>
          </div>
          {/* Feature 6 */}
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <HiShoppingCart className="mx-auto mb-4 h-12 w-12 text-blue-600" />
            <h3 className="text-xl font-semibold mb-2">Assistant de Vente</h3>
            <p className="text-gray-700">
              Guidez vos clients vers l'achat avec des suggestions intelligentes et personnalisées.
            </p>
          </div>
        </div>
      </section>




            {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 max-w-5xl mx-auto text-center">
  <h2 className="text-4xl font-bold mb-12 text-blue-600">Tarifs</h2>

  <div className="flex flex-col md:flex-row justify-center gap-8">
    {/* Plan Gratuit */}
    <div className="flex-1 bg-white p-10 rounded-lg shadow-md border border-blue-600">
      <h3 className="text-2xl font-semibold mb-4">Chatbot Gratuit</h3>
      <p className="text-gray-700 mb-6">
        Accès complet à toutes les fonctionnalités pendant un an.<br />
        
      </p>
      <div className="text-5xl font-bold text-blue-600 mb-6">0 € / mois</div>
      <button
        
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        <Link href="/register">Commencer Gratuitement</Link>
      </button>
    </div>

    {/* Plan Payant */}
    <div className="flex-1 bg-white p-10 rounded-lg shadow-md border border-gray-300">
      <h3 className="text-2xl font-semibold mb-4">Plan Payant</h3>
      <p className="text-gray-700 mb-6">
        Après 1 an d'essai gratuit, passez au plan payant pour un support prioritaire,<br />
        fonctionnalités avancées et intégrations personnalisées.
      </p>
      <div className="text-5xl font-bold text-gray-800 mb-6">29,99 € / mois</div>
      <button
        onClick={() => alert("Redirection vers la page paiement (à implémenter)")}
        className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
      >
        Passer au Plan Payant
      </button>
    </div>
  </div>
</section>

{/* Demo Section */}
<section id="demo" className="py-20 px-6 bg-sky-50">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-4xl font-bold mb-4 text-blue-600">Démo : Comment ça fonctionne ?</h2>
    <p className="text-lg text-gray-700 mb-12">
      Configurez facilement les dialogues de votre chatbot avec des fichiers JSON pour chaque page.
    </p>

    <div className="grid md:grid-cols-2 gap-10 text-left">
      {/* Étapes */}
      <div>
        <h3 className="text-xl font-semibold mb-4">🛠️ Étapes de configuration</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-3">
          <li>Créez un fichier JSON pour chaque type de page (ex : accueil, produit ...)</li>
          <li>Définissez les étapes du dialogue et les réponses possibles</li>
          <li>Déployez le fichier via votre interface</li>
          <li>Le chatbot adapte automatiquement la conversation selon la page active</li>
        </ol>
      </div>

      {/* Exemple de JSON */}
      <div>
        <h3 className="text-xl font-semibold mb-4">📄 Exemple de fichier JSON</h3>
        <pre className="bg-white border rounded-lg p-4 text-sm overflow-x-auto text-left text-gray-800">
{`{
  "page": "home",
  "dialogue": [
    {
        "question": "Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?",
        "options": [
            { "label": "J'ai une question sur ma commande", "action": "redirect", "url": "/mon-compte/commandes" },
            { "label": "Je cherche un produit spécifique", "action": "redirect", "url": "/recherche" },
            { "label": "Informations sur la livraison", "action": "display_info" },
            { "label": "Contacter le service client", "action": "contact_agent" }
        ]
    }
]
}`}
        </pre>
      </div>
    </div>

    <p className="mt-12 text-gray-700">
      Vous pouvez créer autant de dialogues que nécessaire. Notre système détecte automatiquement la page (produit, panier, etc.) et déclenche la bonne configuration.
    </p>

    <button
      className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      
    >
      
      <Link href="/register">Essayer maintenant gratuitement</Link>
    </button>
  </div>
</section>











      {/* Footer */}
      <footer className="bg-blue-600 text-white py-8 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Aidea. Tous droits réservés.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:underline">Mentions légales</a>
            <a href="#" className="hover:underline">Politique de confidentialité</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>

      
    </div>
  )
}
