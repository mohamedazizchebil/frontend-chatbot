"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Login() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const CHATBOT_BACKEND_URL = 'https://e-commerce-chatbot-n039.onrender.com/api';

  const handleSignIn = async () => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch(`${CHATBOT_BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg("Connexion réussie !");
        localStorage.setItem("token", data.token);
        localStorage.setItem("appid", data.appid);

        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        setErrorMsg(data.message || "Identifiants invalides");
      }
    } catch (error) {
      console.error("Erreur login :", error);
      setErrorMsg("Erreur réseau, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !password.trim()) {
      setErrorMsg("Veuillez remplir tous les champs");
      return;
    }
    handleSignIn();
  };

  // Auto-dismiss alerts after 5 seconds
  useEffect(() => {
    if (errorMsg || successMsg) {
      const timer = setTimeout(() => {
        setErrorMsg("");
        setSuccessMsg("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg, successMsg]);

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-10">
        <Image
          src="/chatbot.jpg"
          alt="Logo Aidea Bot"
          width={100}
          height={30}
          className="mx-auto"
          priority
        />
        <h1 className="text-3xl font-extrabold mt-3 mb-2 text-gray-900">
          Aidea Bot
        </h1>
        <p className="text-blue-600 text-lg">Boostez vos ventes avec Aidea</p>
      </div>

      {/* Login form container */}
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Connexion</h2>
            <p className="text-gray-500">Connectez-vous à votre compte</p>
          </div>

          {/* Alert messages */}
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

          {/* Input: Nom du Projet */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nom du Projet
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-3 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-black"
              placeholder="Entrez le nom de votre projet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          {/* Input: Mot de passe */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-3 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-black"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white font-semibold shadow-md transition-colors duration-300 ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400"
            }`}
          >
            {loading ? "Connexion..." : "Se Connecter"}
          </button>
        </form>

        {/* Redirection inscription */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Vous n'avez pas de compte ?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
