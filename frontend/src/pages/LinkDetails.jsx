// LinkDetails.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function LinkDetails() {
  const { id } = useParams();
  const [link, setLink] = useState(null);

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const res = await fetch(`http://localhost:8001/url/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setLink(data);
        }
      } catch (err) {
        console.error("Failed to fetch link details:", err);
      }
    };

    fetchLink();
  }, [id]);

  if (!link) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Link Details</h1>
      <div className="bg-white p-6 rounded shadow max-w-md">
        <h2 className="text-xl font-bold mb-4">{link.title || "Untitled"}</h2>
        <p className="text-gray-600 mb-2">
          <strong>Short Link:</strong>{" "}
          <a
            href={`http://localhost:8001/${link.shortId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            http://localhost:8001/{link.shortId}
          </a>
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Destination:</strong> {link.redirectURL}
        </p>
        <div className="mt-4">
          <h3 className="font-bold mb-2">Engagements over time</h3>
          {/* Add chart or engagement details here */}
        </div>
      </div>
    </div>
  );
}
