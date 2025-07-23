//hook pour initialiser le dialogue du chatbot


import { useEffect } from "react";


export default function useChatInitialisation({
  appId,
  pageType,
  dialogueKey,
  setMessages,
  setCurrentDialogueStep,
  setCurrentOptions,
  setFullDialogueConfig
}) {
  const CHATBOT_BACKEND_URL = 'https://e-commerce-chatbot-n039.onrender.com/api';
  

  useEffect(() => {
    const initializeChatbot = async () => {
      const storedToken = localStorage.getItem(`${dialogueKey}_token`);
      const storedDialogueConfig = localStorage.getItem(`${dialogueKey}_fullDialogueConfig`);
      const storedStep = localStorage.getItem(`${dialogueKey}_currentDialogueStep`);
      const storedMessages = localStorage.getItem(`${dialogueKey}_messages`);

      let isValidSession = false;

      //  Étape 1 : Vérification du token JWT
      if (storedToken) {
        try {
          const checkRes = await fetch(`${CHATBOT_BACKEND_URL}/chat/check-session`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: storedToken }),
          });

          if (checkRes.ok) {
            isValidSession = true;

          } else {
            // Token invalide ou expiré
            localStorage.removeItem(`${dialogueKey}_token`);
            localStorage.removeItem(`${dialogueKey}_messages`);
            localStorage.removeItem(`${dialogueKey}_currentDialogueStep`);
            localStorage.removeItem(`${dialogueKey}_fullDialogueConfig`);

            setMessages([
              {
                type: 'bot',
                content: [
                  {
                    type: 'text',
                    content: "Votre chat est terminé. Pour démarrer une nouvelle conversation, veuillez rafraîchir la page."
                  }
                ]
              }
            ]);

            return;
          }
        } catch (err) {
          console.error("Erreur lors de la vérification du token:", err);
        }
      }

      //  Étape 2 : Si token encore valide → restaurer l'état
      if (isValidSession && storedDialogueConfig && storedStep && storedMessages) {
        const parsedStep = JSON.parse(storedStep);
        setFullDialogueConfig(JSON.parse(storedDialogueConfig));
        setCurrentDialogueStep(parsedStep);
        setMessages(JSON.parse(storedMessages));
        setCurrentOptions(parsedStep.options);
        return;
      }

      //  Étape 3 : Initialisation depuis le backend
      try {
        const initRes = await fetch(`${CHATBOT_BACKEND_URL}/chat/init`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ appid: appId, pageType }),
        });

        const data = await initRes.json();

        if (!data.initialDialogueConfig || !data.token) {
          setMessages([
            {
              type: 'bot',
              content: [{ type: 'text', content: data.errorMessage || "Chatbot indisponible." }],
            },
          ]);
          return;
        }

        const initialStep = data.initialDialogueConfig.dialogue[0];

        // Sauvegarde dans localStorage
        localStorage.setItem(`${dialogueKey}_token`, data.token);
        localStorage.setItem(`${dialogueKey}_fullDialogueConfig`, JSON.stringify(data.initialDialogueConfig));
        localStorage.setItem(`${dialogueKey}_currentDialogueStep`, JSON.stringify(initialStep));
        localStorage.setItem(
          `${dialogueKey}_messages`,
          JSON.stringify([{ type: 'bot', content: [{ type: 'text', content: initialStep.question }] }])
        );

        // Mise à jour de l'état
        setFullDialogueConfig(data.initialDialogueConfig);
        setCurrentDialogueStep(initialStep);
        setMessages([{ type: 'bot', content: [{ type: 'text', content: initialStep.question }] }]);
        setCurrentOptions(initialStep.options);
      } catch (err) {
        console.error(" Erreur d'initialisation du chatbot:", err);
        setMessages([
          {
            type: 'bot',
            content: [{ type: 'text', content: "Aidea n'est pas disponible pour le moment." }],
          },
        ]);
      }
    };

    initializeChatbot();
  }, [appId, pageType]);
}
