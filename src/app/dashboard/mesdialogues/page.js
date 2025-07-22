'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Editor from '@monaco-editor/react';
import Alert from '@mui/material/Alert';
import { fetchWithAuth } from '@/app/utils/fetchWithAuth';
import useSWR from 'swr';
import DialogueList from '../../components/DialogueList';

const CHATBOT_BACKEND_URL = 'https://e-commerce-chatbot-n039.onrender.com/api';

// SWR fetcher avec token + redirection si 401
const swrFetcher = ([url, router]) => async () => {
  const res = await fetchWithAuth(url, {}, router);
  if (!res) throw new Error('Session expirée');
  if (!res.ok) {
    const err = new Error('Erreur lors du chargement');
    err.status = res.status;
    throw err;
  }
  return res.json();
};

export default function MesDialoguesPage() {
  const [pageType, setPageType] = useState('');
  const [newDialogue, setNewDialogue] = useState('[]');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  const { data, error, isLoading, mutate } = useSWR(
    [`${CHATBOT_BACKEND_URL}/getall`, router],
    swrFetcher([`${CHATBOT_BACKEND_URL}/getall`, router])
  );

  const handleAddDialogue = async (e) => {
    e.preventDefault();

    if (!pageType.trim() || !newDialogue.trim()) {
      setSuccessMsg('');
      setErrorMsg('Veuillez remplir tous les champs');
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
      const res = await fetchWithAuth(
        `${CHATBOT_BACKEND_URL}/add`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pageType, dialogue: parsedDialogue }),
        },
        router
      );

      if (!res) return;

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg('Dialogue ajouté avec succès.');
        setErrorMsg('');
        setPageType('');
        setNewDialogue('[]');
        mutate(); 
      } else {
        setSuccessMsg('');
        setErrorMsg('Veuillez suivre la structure du dialogue');
      }
    } catch {
      setSuccessMsg('');
      setErrorMsg('Erreur réseau.');
    }
  };

  const handleDelete = async (pageType) => {
    const confirmDelete = window.confirm(`Supprimer le dialogue pour "${pageType}" ?`);
    if (!confirmDelete) return;

    try {
      const res = await fetchWithAuth(
        `${CHATBOT_BACKEND_URL}/delete`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pageType }),
        },
        router
      );

      if (!res) return;

      const data = await res.json();
      if (res.ok) {
        mutate(); // rafraîchit la liste après suppression
      } else {
        alert(data.error || 'Erreur lors de la suppression.');
      }
    } catch {
      alert('Erreur réseau.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Mes Dialogues</h1>

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
        <Alert severity="error" className="text-sm" onClose={() => setErrorMsg('')}>
          {errorMsg}
        </Alert>
      )}
      {successMsg && (
        <Alert severity="success" className="text-sm" onClose={() => setSuccessMsg('')}>
          {successMsg}
        </Alert>
      )}

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
      {isLoading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="text-red-600">Erreur lors du chargement des dialogues.</p>
      ) : (
        <DialogueList dialogues={data?.dialogues || []} onDelete={handleDelete} />
      )}
    </div>
  );
}
