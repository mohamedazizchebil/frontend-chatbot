'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Editor from '@monaco-editor/react';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import DialogueList from '../../components/DialogueList'

export default function MesDialoguesPage() {
  const [dialogues, setDialogues] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [pageType, setPageType] = useState('');
  const [newDialogue, setNewDialogue] = useState('[]');
  const router = useRouter();
  const CHATBOT_BACKEND_URL = 'http://localhost:3001/api';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchDialogues();
  }, [router]);

  const fetchDialogues = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${CHATBOT_BACKEND_URL}/getall`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setDialogues(data.dialogues || []);
      } else {
        setErrorMsg("Erreur lors du chargement des dialogues.")
        
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Erreur réseau.');
    }
  };

  const handleAddDialogue = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!pageType.trim() || !newDialogue.trim()) {
      setErrorMsg("Veuillez remplir tous les champs");
      return;
    }

    let parsedDialogue;
    try {
      parsedDialogue = JSON.parse(newDialogue);
    } catch {
      setErrorMsg('JSON invalide, corrigez-le avant de soumettre.');
      return;
    }

    try {
      const res = await fetch(`${CHATBOT_BACKEND_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pageType,
          dialogue: parsedDialogue,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg('Dialogue ajouté avec succès.');
        setPageType('');
        setNewDialogue('[]');
        fetchDialogues();
      } else {
        setErrorMsg("Veuillez suivre La structure du dialogue");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Erreur réseau.');
    }
  };

  const handleDelete = async (pageType) => {
    const token = localStorage.getItem('token');
    const confirm = window.confirm(`Supprimer le dialogue pour "${pageType}" ?`);
    if (!confirm) return;

    try {
      const res = await fetch(`${CHATBOT_BACKEND_URL}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pageType }),
      });

      const data = await res.json();
      if (res.ok) {
        setDialogues((prev) => prev.filter((d) => d.pageType !== pageType));
      } else {
        alert(data.error || 'Erreur lors de la suppression.');
      }
    } catch (err) {
      console.error(err);
      alert('Erreur réseau.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Mes Dialogues</h1>

      {/* 📌 Infos sur la structure attendue */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
        <h2 className="text-lg font-semibold text-yellow-800 mb-1">⚠️ Structure attendue pour les dialogues</h2>
        <p className="text-sm text-yellow-700 mb-2">
          Le champ <code className="bg-gray-100 px-1 rounded">dialogue</code> doit suivre une structure précise :
        </p>
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

      {/* ➕ Ajouter un nouveau dialogue */}
      <form onSubmit={handleAddDialogue} className="mb-12 bg-white p-6 rounded shadow space-y-6">
        <h2 className="text-xl font-semibold text-gray-700">Ajouter un Dialogue</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1 text-black">Page Type</label>
            <input
              type="text"
              value={pageType}
              onChange={(e) => setPageType(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm text-black"
              placeholder="ex: produit, accueil..."
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1 text-black">Dialogue (JSON)</label>
            <div className="border rounded">
              <Editor
                height="200px"
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
          Ajouter le dialogue
        </button>
      </form>

      {/* Liste des dialogues existants */}
      <DialogueList dialogues={dialogues} onDelete={handleDelete} />
    </div>
  );
}
