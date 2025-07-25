'use client'
import React, { useState, useEffect } from 'react';
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchWithAuth } from '@/app/utils/fetchWithAuth';
import { useRouter } from 'next/navigation';

export default function ElasticConfigPage() {
  const [elasticUrl, setElasticUrl] = useState('');
  const [elasticKey, setElasticKey] = useState('');
  const [elasticIndex, setElasticIndex] = useState('');
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const CHATBOT_BACKEND_URL = 'https://e-commerce-chatbot-n039.onrender.com/api';
  const router = useRouter();

  useEffect(() => {
    
      verifyElasticConfig();
    
  }, []);



  //Vérification de config elasticsearch

  const verifyElasticConfig = async () => {
    try {
      const res = await fetchWithAuth(`${CHATBOT_BACKEND_URL}/getElasticInformation`, {
        method: 'GET'
      }, router);

      if (!res) return;

      const data = await res.json();

      if (res.ok && data.elasticsearch) {
        setSuccessMsg('Configuration Elasticsearch trouvée !');
        setElasticUrl(data.elasticsearch.url ?? '');
        setElasticKey(data.elasticsearch.apiKey ?? '');
        setElasticIndex(data.elasticsearch.index ?? '');
        setIsConfigured(true);
      } else {
        setErrorMsg(data.error || 'Une erreur est survenue lors de la vérification.');
      }
    } catch (err) {
      setErrorMsg('Erreur. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };



  //Ajout ou modification de config

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!elasticUrl.trim() || !elasticKey.trim() || !elasticIndex.trim()) {
      setErrorMsg("Veuillez remplir tous les champs");
      setSuccessMsg("");
      return;
    }

    try {
      const res = await fetchWithAuth(`${CHATBOT_BACKEND_URL}/addElasticInformation`, {
        method: 'POST',
        body: JSON.stringify({
          url: elasticUrl,
          apikey: elasticKey,
          index: elasticIndex
        }),
      }, router);

      if (!res) return;

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg('Informations Elasticsearch enregistrées avec succès !');
        setIsConfigured(true);
        setIsEditing(false);
        setErrorMsg("");
      } else {
        setErrorMsg(data.error || 'Une erreur est survenue.');
        setSuccessMsg("");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Erreur réseau. Veuillez réessayer.');
    }
  };

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <CircularProgress size={48} color="primary" />
    </div>
  ) : (
    <div className="max-w-xl mx-auto mt-12 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2 text-blue-600">Configuration Elasticsearch</h2>
      <p className="mb-4 text-gray-600 text-sm">
        Vous devez configurer Elasticsearch pour une meilleure expérience.
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">URL Elasticsearch</label>
          <input
            type="text"
            placeholder="https://votre-elasticsearch-url"
            className="w-full px-4 py-2 border rounded-md text-black"
            value={elasticUrl}
            onChange={(e) => setElasticUrl(e.target.value)}
            disabled={isConfigured && !isEditing}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Clé API Elasticsearch</label>
          <input
            type="text"
            placeholder="Votre clé API"
            className="w-full px-4 py-2 border rounded-md text-black"
            value={elasticKey}
            onChange={(e) => setElasticKey(e.target.value)}
            disabled={isConfigured && !isEditing}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Index Elasticsearch</label>
          <input
            type="text"
            placeholder="Votre Index"
            className="w-full px-4 py-2 border rounded-md text-black"
            value={elasticIndex}
            onChange={(e) => setElasticIndex(e.target.value)}
            disabled={isConfigured && !isEditing}
          />
        </div>

        {isConfigured && !isEditing && (
          <button
            type="button"
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
            onClick={() => setIsEditing(true)}
          >
            Modifier
          </button>
        )}

        {(!isConfigured || isEditing) && (
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Enregistrer
          </button>
        )}

        {errorMsg && (
          <Alert severity="error" role="alert" aria-live="assertive">
            {errorMsg}
          </Alert>
        )}
        {successMsg && (
          <Alert severity="success" role="status" aria-live="polite">
            {successMsg}
          </Alert>
        )}
      </form>
    </div>
  );
}
