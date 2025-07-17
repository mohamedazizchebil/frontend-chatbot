"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Alert from "@mui/material/Alert";


export default function Registration() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const CHATBOT_BACKEND_URL = "http://localhost:3001/api";

  const handleSignUp = async () => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch(`${CHATBOT_BACKEND_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg(data.message || "Inscription réussie !");
        setName("");
        setPassword("");
        setTimeout(() => router.push("/login"), 1500);
      } else if (res.status === 409) {
        setErrorMsg("Ce nom est déjà pris. Veuillez en choisir un autre.");
      } else {
        setErrorMsg(data.message || "Erreur lors de l'inscription");
      }
    } catch (error) {
      setErrorMsg("Erreur réseau, veuillez réessayer.");
      console.error(error);
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

    handleSignUp();
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
      <div className="text-center mb-10">
        <Image
          src="/chatbot.jpg"
          alt="Logo Aidea Bot"
          width={100}
          height={30}
          className="mx-auto"
          priority
        />
        <h1 className="text-3xl font-extrabold mt-3 mb-3 text-gray-900">Aidea Bot</h1>
        <p className="text-blue-600 text-lg">Boostez vos ventes avec Aidea</p>
      </div>

      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Inscription</h2>
            <p className="text-gray-500">Créez votre compte pour commencer</p>
          </div>

          {/* Messages d’erreur et succès */}
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

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nom du Projet
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-3 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-black"
              placeholder="Entrez Le nom de votre projet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
            />
          </div>

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
              autoComplete="new-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white font-semibold shadow-md transition-colors duration-300 ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400"
            }`}
          >
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
