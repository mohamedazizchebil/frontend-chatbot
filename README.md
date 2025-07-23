
# Aidea – Chatbot E-commerce

Aidea est un chatbot intelligent conçu pour les sites e-commerce. Il automatise le support client, propose des recommandations personnalisées grâce à l’IA. Facile à configurer(fichiers JSON), il s’intègre sur n’importe quel site via un simple widget web.



## Structure principale du projet

```
chatbot/
├── public/                # Fichiers statiques accessibles (images, styles, scripts du widget)
├── src/
│   ├── index.jsx          # Point d'entrée du widget web (pour intégration externe)
│   └── app/
│       ├── components/    # Composants React du chatbot (UI, boutons, messages, etc.)
│       ├── hooks/         # Hooks personnalisés (logique métier du chat, gestion dialogue, recherche)
│       ├── utils/         # Fonctions utilitaires (authentification, requêtes)
│       ├── dashboard/     # Interface d'administration (gestion dialogues, config Elasticsearch)
│       ├── login/         # Page de connexion administrateur
│       ├── register/      # Page d'inscription administrateur
│       ├── widget/        # Exemple d’intégration du widget
│       ├── page.js        # Page d’accueil principale de l’application
│       ├── layout.js      # Layout global de l’application
│       └── globals.css    # Feuille de styles globale
├── package.json           # Dépendances et scripts npm
├── vite.config.mjs        # Configuration Vite
├── next.config.mjs        # Configuration Next.js
├── postcss.config.mjs     # Configuration PostCSS
├── jsconfig.json          # Configuration JS
└── README.md              # Documentation du projet
```


**Détail des dossiers et fichiers principaux :**

- `public/` : Contient les fichiers statiques accessibles par le navigateur (images, CSS, JS du widget).
- `src/index.jsx` : Point d’entrée pour l’export du widget `<chat-widget>` (permet l’intégration sur n’importe quel site).
- `src/app/components/` : Tous les composants d’interface du chatbot (boutons, messages, widget principal, etc.).
- `src/app/hooks/` : Hooks React personnalisés pour la logique métier (initialisation du chat, gestion des actions, recherche de produits, etc.).
- `src/app/utils/` : Fonctions utilitaires, notamment pour les appels API sécurisés (ex : gestion de l’authentification).
- `src/app/dashboard/` : Pages et composants pour l’administration (gestion des dialogues, configuration d’Elasticsearch, etc.).
- `src/app/login/` et `src/app/register/` : Pages d’authentification pour l’accès à l’administration du chatbot.
- `src/app/widget/` : Exemple d’intégration du widget sur une page (utile pour tester ou démontrer l’intégration).
- `src/app/page.js` : Page d’accueil principale de l’application (présentation, démo, etc.).
- `src/app/layout.js` : Layout global de l’application (structure commune à toutes les pages).
- `src/app/globals.css` : Feuille de styles globale appliquée à l’ensemble de l’application.
- `package.json` : Liste des dépendances, scripts de build et de développement.
- `vite.config.mjs`, `next.config.mjs`, `postcss.config.mjs`, `jsconfig.json` : Fichiers de configuration pour les outils de build, Next.js, PostCSS et JavaScript.
- `README.md` : Documentation du projet.





## Fonctionnalités

- **Dialogues configurables** : Créez des scénarios adaptés à chaque page de votre site.
- **IA intégrée** : Recommandations de produits rapides et pertinentes grâce à l’intelligence artificielle.
- **Configuration personnalisable** : configurer l’URL, la clé API et l’index Elasticsearch directement depuis le dashboard d’administration.
- **Recherche de produits** : Permet aux utilisateurs de rechercher des produits directement dans le chat.
- **Actions automatisées** : Redirection, contact avec un agent, recherche sémantique, etc.
- **Gestion des dialogues par page** : Le chatbot adapte automatiquement la conversation selon la page active (accueil, produit, panier, etc.).
- **Recherche de produits similaires** : Sur les pages produits, propose des alternatives pertinentes.
- **Gestion de session sécurisée** : Utilisation de tokens pour maintenir la session utilisateur.

- **Intégration facile** : Utilisable comme composant web `<chat-widget>` sur n’importe quel site.







## Configuration des dialogues

1. **Créez un fichier JSON** pour chaque type de page (ex : accueil, produit, panier).
2. **Définissez les étapes du dialogue** et les options pour chaque étape.
3. **Déployez le JSON** via l’interface d’administration.
4. Le chatbot adapte automatiquement la conversation selon la page active.

### Exemple de structure JSON

```json
{
  "page": "home",
  "dialogue": [
    {
      "question": "Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?",
      "options": [
        { "label": "J'ai une question sur ma commande", "action": "redirect", "url": "/mon-compte/commandes" },
        { "label": "Je cherche un produit spécifique", "action": "semantic_search" },
        { "label": "Informations sur la livraison", "action": "display_info" },
        { "label": "Contacter le service client", "action": "contact_agent" }
      ]
    }
  ]
}
```

Chaque option peut déclencher une action : `redirect`, `semantic_search`, `display_info`, `contact_agent`, ou proposer une nouvelle étape de dialogue via `next`.

## Intégration sur votre site

Intégrez le chatbot en ajoutant ce code HTML à votre site :

```html
<head>
  <link rel="stylesheet" href="https://frontend-chatbot-u6tn.vercel.app/chatbot.css" />
</head>
<body>
  <chat-widget
    appid="VOTRE_APP_ID"
    pagetype="home"
    pagespecificdata='{"productName": "NOM_DU_PRODUIT"}'>
  </chat-widget>
  <script src="https://frontend-chatbot-u6tn.vercel.app/chat-widget.js"></script>
</body>
```

**Props disponibles :**
- `appid` : identifiant de votre application
- `pagetype` : type de page (ex : home, produit)
- `pagespecificdata` : (optionnel) données contextuelles (ex : nom du produit)
- `isopen` : (optionnel) contrôle l’ouverture du chat


## Stack technique
- Next.js, React, Vite, TailwindCSS, MUI


