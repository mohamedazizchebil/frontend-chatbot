// utils/fetchWithAuth.js
export async function fetchWithAuth(url, options = {}, router) {
  const token = localStorage.getItem("token");

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    // Token expiré ou invalide → on déconnecte
    localStorage.removeItem("token");
    localStorage.removeItem("appid");
    router.push("/login");
    alert("Votre session a expiré. Veuillez vous reconnecter.");
    return null;
  }

  return res;
}
