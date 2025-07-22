'use client';

import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';

import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Editor from "@monaco-editor/react";
import { fetchWithAuth } from "@/app/utils/fetchWithAuth";

export default function ModifyDialogue() {
  const router = useRouter();

  const { pageType } = useParams();

  const [dialogue, setDialogue] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [newDialogue, setNewDialogue] = useState('');
  
  const CHATBOT_BACKEND_URL = 'https://e-commerce-chatbot-n039.onrender.com/api';

  const fetchDialogue = async () => {
    try {
      const res = await fetchWithAuth(`${CHATBOT_BACKEND_URL}/get/${pageType}`, {}, router);
       if(!res){
        return;
       }
      const data = await res.json();
      if (res.ok) {
        setDialogue(data.dialogue || []);
        setNewDialogue(JSON.stringify(data.dialogue || {}, null, 2));
      }
    }
     catch (err) {
      setSuccessMsg("");
      setErrorMsg("Erreur lors du chargement de dialogue.");
    }
  };

  const handleAddDialogue = async (e) => {
    e.preventDefault();

    try {
      const res = await fetchWithAuth(`${CHATBOT_BACKEND_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          
        },
        body: JSON.stringify({
          pageType,
          dialogue: JSON.parse(newDialogue),
        }),
      },router);

      if(!res){
        return
      }

      if (res.ok) {
        setSuccessMsg("Dialogue modifié avec succès.");
        setErrorMsg("");
        fetchDialogue();
        setTimeout(() => {
        router.push('/dashboard/mesdialogues');
      }, 1000);
      } else {
        setErrorMsg("Veuillez suivre La structure du dialogue");
        setSuccessMsg("");
      }
    } catch (err) {
      setErrorMsg("Erreur réseau.");
      setSuccessMsg("");
    }
  };

  useEffect(() => {
    if (pageType) {
      fetchDialogue();
    }
  }, [pageType]);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Dialogue pour la page : {pageType}
      </h1>

      

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
        <h2 className="text-lg font-semibold text-yellow-800 mb-1">
          ⚠️ Structure attendue pour les dialogues
        </h2>
        <ul className="list-disc pl-6 text-sm text-yellow-700 space-y-1">
          <li><code>question</code> (string) requis</li>
          <li><code>options</code> (array) requis</li>
          <li>Chaque option contient :
            <ul className="pl-5 list-disc">
              <li><code>label</code> (string) requis</li>
              <li><code>action</code> (string) requis — ex: <code>semantic_search</code>, <code>redirect</code></li>
              <li><code>url</code> requis si <code>action === "redirect"</code></li>
              <li><code>next</code> est un tableau récursif d'étapes (optionnel)</li>
            </ul>
          </li>
        </ul>
      </div>


       {errorMsg && (
                        <Alert
                          severity="error"
                          className="text-sm"
                          onClose={() => setErrorMsg("")}
                          role="alert"
                          aria-live="assertive"
                        >
                          
                          {errorMsg}
                        </Alert>
                      )}
                      {successMsg && (
                        <Alert
                          severity="success"
                          className="text-sm"
                          onClose={() => setSuccessMsg("")}
                          role="status"
                          aria-live="polite"
                        >
                          {successMsg}
                        </Alert>
                      )}

      <form onSubmit={handleAddDialogue} className="mb-12 bg-white p-6 rounded shadow space-y-6">
        <h2 className="text-xl font-semibold text-gray-700">Modifier le Dialogue</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-3">
            <label className="block text-sm font-medium mb-1 text-black">Dialogue (JSON)</label>
            <div className="border rounded">
              <Editor
                height="300px"
                defaultLanguage="json"
                value={newDialogue}
                onChange={(value) => setNewDialogue(value || '')}
                options={{
                  minimap: { enabled: false },
                  automaticLayout: true,
                  formatOnType: true,
                  formatOnPaste: true,
                }}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Sauvegarder le dialogue
        </button>
      </form>
    </div>
  );
}
