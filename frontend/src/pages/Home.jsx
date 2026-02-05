import { useState } from "react";
import Popup from "./Popup";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortId, setShortId] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Check if the user is logged in by verifying the presence of a token in localStorage
  const isLoggedIn = !!localStorage.getItem("token");

  const handleShorten = async () => {
    if (!url) {
      alert("Please enter a URL");
      return;
    }

    try {
      const res = await fetch("http://localhost:8001/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(isLoggedIn && { Authorization: `Bearer ${localStorage.getItem("token")}` }),
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to shorten");
        return;
      }

      setShortId(data.id);

      // Only show popup if the user is logged in
      if (isLoggedIn) {
        setShowPopup(true);
      }
      setError("");
    } catch (err) {
      console.log(err);
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* HEADER */}
      <header className="flex justify-between items-center px-10 py-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">Shortly</h1>
        <div className="space-x-4">
          <a href="/login">
            <button className="px-5 py-2 rounded-md border border-white hover:bg-white hover:text-black transition">
              Login
            </button>
          </a>
          <a href="/signup">
            <button className="px-5 py-2 rounded-md bg-white text-black hover:bg-gray-200 transition">
              Sign Up Free
            </button>
          </a>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex flex-col items-center justify-center text-center mt-28 px-4">
        <h2 className="text-5xl font-extrabold mb-6">
          Shorten Your Long Links <br /> Instantly
        </h2>
        <p className="text-gray-400 max-w-xl mb-10">
          Paste your long URL below and get a clean, short, shareable link in seconds.
        </p>

        <div className="flex w-full max-w-2xl shadow-lg">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your long URL here..."
            className="flex-1 px-5 py-4 rounded-l-lg text-black outline-none"
          />
          <button
            onClick={handleShorten}
            className="px-8 bg-blue-600 hover:bg-blue-700 rounded-r-lg font-semibold"
          >
            Shorten
          </button>
        </div>

        {/* RESULT */}
        {shortId && !isLoggedIn && (
          <div className="mt-8 bg-gray-900 px-6 py-4 rounded-lg">
            <p className="text-gray-400 mb-2">Your Short ID:</p>
            <p className="text-blue-400 font-bold">{shortId}</p>
          </div>
        )}

        {error && (
          <p className="text-red-500 mt-4">{error}</p>
        )}
      </main>

      {/* Popup - Only show if user is logged in */}
      {showPopup && <Popup shortId={shortId} onClose={() => setShowPopup(false)} />}
    </div>
  );
}
