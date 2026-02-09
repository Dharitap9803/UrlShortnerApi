import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShortlyClone = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isShortened, setIsShortened] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (!longUrl.trim()) {
      setShowWarning(true);
      setIsShortened(false);
    } else {
      setShowWarning(false);
      // Mock shortening logic
      setShortUrl(`https://short.ly/${Math.random().toString(36).substring(2, 8)}`);
      setIsShortened(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-20 py-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl text-blue-300" style={{ fontFamily: "'Pacifico', cursive" }}>
            Shortly
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-300">
              Platform
            </a>
            <a href="#" className="hover:text-gray-300">
              Solutions
            </a>
            <a href="#" className="hover:text-gray-300">
              Pricing
            </a>
            <a href="#" className="hover:text-gray-300">
              Resources
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <select className="bg-transparent border border-gray-600 px-2 py-1 rounded">
              <option>🌐 EN</option>
            </select>
            <button
              className="hover:text-gray-300 cursor-pointer bg-transparent border-none"
              onClick={() => navigate('/login')}
            >
              Log in
            </button>
            <a
              href="#"
              className="bg-white text-gray-900 px-4 py-2 rounded hover:bg-gray-200"
            >
              Get a Quote
            </a>
            <button
              className="border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 cursor-pointer"
              onClick={() => navigate('/signup')}
            >
              Sign up Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-20 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 max-w-5xl">
          Build stronger digital connections
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-5xl">
          Use our URL shortener and landing pages to engage your audience and connect them to the right information. Build, edit, and track everything inside the Shortly Connections Platform.
        </p>
      </div>

      {/* Shorten Link Section */}
      <div className="flex justify-center px-20 mb-20">
        <div className="w-full max-w-4xl">
          <div className="bg-white text-gray-900 rounded-xl p-8 shadow-lg">
            <div className="flex space-x-4 mb-6">
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Short Link</span>
              </button>
            </div>
            <form onSubmit={handleShorten}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Paste your long link here
                </label>
                <input
                  type="text"
                  value={longUrl}
                  onChange={(e) => {
                    setLongUrl(e.target.value);
                    setShowWarning(false);
                  }}
                  placeholder="https://example.com/my-long-url"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${showWarning ? "border-red-500" : "border-gray-300"}`}
                />
                {showWarning && (
                  <p className="text-red-500 text-xs italic mt-1">
                    We'll need a valid URL, like "super-long-link.com/shorten-it"
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
              >
                <span>Get your link for free</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
            {isShortened && (
              <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                <p className="text-green-600 font-bold">Your shortened link:</p>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 break-all"
                >
                  {shortUrl}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="text-center px-20 py-10">
        <p className="text-gray-300">
          Sign up for free. Your free plan includes:
        </p>
      </div>
    </div>
  );
};

export default ShortlyClone;
