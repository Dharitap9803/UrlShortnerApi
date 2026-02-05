import { useState } from "react";

export default function Popup({ shortId, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:8001/${shortId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Your link is ready! 🎉</h2>
        <p className="mb-4">Copy the link below to share it or choose a platform to share it to.</p>
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded">
          <span className="text-blue-500 font-semibold">
            http://localhost:8001/{shortId}
          </span>
          <button
            onClick={handleCopy}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
