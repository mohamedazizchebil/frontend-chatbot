
const CHATBOT_BACKEND_URL = 'http://localhost:3001/api';


export default function useSearchHandler({
  appId,
  messages,
  setMessages,
  userInput,
  setUserInput,
  setIsThinking,
  setShowSearchInput,
  setCurrentOptions,
  dialogueKey
}) {
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const trimmedInput = userInput.trim();
    const regex = /^[a-zA-Z0-9\sÀ-ÿ'-]+$/;
    const numbers = /^[0-9]+$/;



    if(!trimmedInput){
      setUserInput('');
      return;
    }

    if (!trimmedInput || trimmedInput.length < 3 || !regex.test(trimmedInput) || numbers.test(trimmedInput)) {
      const errorMessages = [
        { type: 'user', content: [{ type: 'text', content: trimmedInput }] },
        { type: 'bot', content: [{ type: 'text', content: "Désolé, je n'ai pas compris votre saisie. Réessayez !" }] }
      ];
      const updated = [...messages, ...errorMessages];
      setMessages(updated);
      localStorage.setItem(`${dialogueKey}_messages`, JSON.stringify(updated));
      setUserInput('');
      return;
    }

    const newUserMessage = {
      type: 'user',
      content: [{ type: 'text', content: trimmedInput }]
    };

    const updated = [...messages, newUserMessage];
    setMessages(updated);
    localStorage.setItem(`${dialogueKey}_messages`, JSON.stringify(updated));
    setUserInput('');
    setShowSearchInput(false);
    setIsThinking(true);

    try {
      const res = await fetch(`${CHATBOT_BACKEND_URL}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: trimmedInput, description: trimmedInput,appid:appId }),
      });

      const searchData = await res.json();
      setIsThinking(false);

      const botResponse = {
        type: 'bot',
        content: searchData.length > 0
          ? searchData.map((product) => ({
              type: 'product',
              content: {
                nom: product.nom || 'Nom indisponible',
                description: product.description || 'Description indisponible',
                image: product.image || 'https://via.placeholder.com/150',
                lien: product.lien,
              },
            }))
          : [{ type: 'text', content: "Aucun produit trouvé." }]
      };

      const finalMessages = [...updated, botResponse];
      setMessages(finalMessages);
      localStorage.setItem(`${dialogueKey}_messages`, JSON.stringify(finalMessages));
      setCurrentOptions([
        { label: "Rechercher un autre produit", action: "semantic_search" },
        { label: "Parler à un agent", action: "contact_agent" },
      ]);
    } catch (err) {
      console.error("Erreur lors de la recherche :", err);
    }
  };

  return { handleSearchSubmit };
}
