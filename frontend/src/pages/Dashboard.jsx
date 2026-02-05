// Dashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch("http://localhost:8001/url/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setLinks(data.links);
        }
      } catch (err) {
        console.error("Failed to fetch links:", err);
      }
    };

    fetchLinks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Your Links</h1>
      <button
        onClick={() => navigate("/links/create")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6"
      >
        Create New Link
      </button>
      <div className="space-y-4">
        {links.map((link) => (
          <div key={link._id} className="bg-white p-4 rounded shadow">
            <a
              href={`http://localhost:8001/${link.shortId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 font-semibold"
            >
              http://localhost:8001/{link.shortId}
            </a>
            <p className="text-gray-600">{link.redirectURL}</p>
            <button
              onClick={() => navigate(`/links/${link.shortId}`)}
              className="text-sm text-gray-500 mt-2"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
