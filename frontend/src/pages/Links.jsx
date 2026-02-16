import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UrlAPI } from "../api";

const BACKEND_BASE = "http://localhost:8001";

export default function CreateLink() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [destinationUrl, setDestinationUrl] = useState(location.state?.url || "");
  const [shortDomain, setShortDomain] = useState("bit.ly");
  const [backHalf, setBackHalf] = useState("");
  const [title, setTitle] = useState("");
  const [addToPage, setAddToPage] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // User profile data (default, overridden from localStorage)
  const [user, setUser] = useState({
    name: "Dharita Patel",
    email: "dharita2003@gmail.com",
    accountId: "o_68svc686ej",
    accountType: "Free account"
  });

  const profileDropdownRef = useRef(null);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle profile dropdown
  const toggleProfileDropdown = (e) => {
    e.stopPropagation();
    setShowProfileDropdown(!showProfileDropdown);
  };

  useEffect(() => {
    if (location.state?.url) setDestinationUrl(location.state.url);
  }, [location.state?.url]);

  // Load user from localStorage if available
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const stored = JSON.parse(raw);
        setUser((prev) => ({
          ...prev,
          name: stored.name || prev.name,
          email: stored.email || prev.email,
          accountId: stored.id || prev.accountId,
        }));
      }
    } catch {
      // ignore parsing errors
    }
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    let urlToShorten = destinationUrl.trim();
    if (!urlToShorten) {
      setError("Please enter a destination URL.");
      return;
    }
    if (!urlToShorten.startsWith("http://") && !urlToShorten.startsWith("https://")) {
      urlToShorten = `https://${urlToShorten}`;
    }
    try {
      setLoading(true);
      const { data } = await UrlAPI.shorten(urlToShorten);
      navigate(`/link-details`, { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Failed to create short link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar - match LinkDetails */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link to="/home" className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
            S
          </Link>
          <div className="hidden sm:block flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        {/* Right side: Upgrade, Help, profile (reuse existing dropdown state) */}
        <div className="flex items-center space-x-4 relative" ref={profileDropdownRef}>
          <Link to="/upgrade" className="bg-emerald-600 text-white text-sm px-3 py-1.5 rounded-md hover:bg-emerald-700">
            Upgrade
          </Link>
          <button className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium hover:bg-blue-700">
            ?
          </button>
          <button
            onClick={toggleProfileDropdown}
            className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="hidden sm:inline text-sm font-medium text-gray-800">{user.name}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Profile Dropdown */}
          {showProfileDropdown && (
            <div className="absolute top-12 right-0 w-64 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="text-gray-500 mb-1">{user.accountId}</div>
                  <div className="text-gray-500">{user.accountType}</div>
                </div>
              </div>
              <div className="p-2">
                <div className="py-1">
                  <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Support</div>
                  <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">API documentation</div>
                  <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Webinars</div>
                  <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Bitly Terms</div>
                </div>
                <div className="p-2 border-t border-gray-200">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setShowProfileDropdown(false)}
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - copied from LinkDetails */}
        <aside
          className={`bg-white border-r border-gray-200 flex flex-col items-center py-4 transition-all duration-200 ${
            isSidebarOpen ? "w-56" : "w-16"
          }`}
        >
          <div className="flex flex-col items-center gap-4 w-full">
            <Link to="/home" className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
              S
            </Link>
            <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500" aria-label="Expand sidebar">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <Link
              to="/links"
              className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Link>
          </div>
          <nav className="mt-6 flex flex-col items-center gap-1 w-full">
            <Link
              to="/home"
              className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${
                !isSidebarOpen ? "mx-auto" : "w-full px-3"
              } text-gray-600 hover:bg-gray-100`}
              title="Home"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {isSidebarOpen && <span className="ml-2 text-sm">Home</span>}
            </Link>
            <Link
              to="/link-details"
              className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${
                !isSidebarOpen ? "mx-auto bg-blue-50 text-blue-600" : "w-full px-3 bg-blue-50 text-blue-600"
              }`}
              title="Links"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              {isSidebarOpen && <span className="ml-2 text-sm font-medium">Links</span>}
            </Link>
            <button
              className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${
                !isSidebarOpen ? "mx-auto" : "w-full px-3"
              } text-gray-600 hover:bg-gray-100`}
              title="QR codes"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              {isSidebarOpen && <span className="ml-2 text-sm">QR codes</span>}
            </button>
            <button
              className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${
                !isSidebarOpen ? "mx-auto" : "w-full px-3"
              } text-gray-600 hover:bg-gray-100`}
              title="Custom links"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {isSidebarOpen && <span className="ml-2 text-sm">Custom links</span>}
            </button>
            <button
              className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${
                !isSidebarOpen ? "mx-auto" : "w-full px-3"
              } text-gray-600 hover:bg-gray-100`}
              title="Analytics"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {isSidebarOpen && <span className="ml-2 text-sm">Analytics</span>}
            </button>
            <button
              className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${
                !isSidebarOpen ? "mx-auto" : "w-full px-3"
              } text-gray-600 hover:bg-gray-100`}
              title="Integrations"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
              {isSidebarOpen && <span className="ml-2 text-sm">Integrations</span>}
            </button>
            <button
              className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 mt-4 ${
                !isSidebarOpen ? "mx-auto" : "w-full px-3"
              } text-gray-600 hover:bg-gray-100`}
              title="Settings"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {isSidebarOpen && <span className="ml-2 text-sm">Settings</span>}
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Create a new link</h1>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Link Details Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Link details</h2>
                  <div className="text-sm text-gray-500">
                    You have 3 links and 3 custom back-halves remaining this month.
                    <Link to="/upgrade" className="text-blue-600 hover:underline">Upgrade for more.</Link>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="destinationUrl" className="block text-sm font-medium text-gray-700 mb-1">
                      Destination URL
                    </label>
                    <input
                      type="url"
                      id="destinationUrl"
                      value={destinationUrl}
                      onChange={(e) => setDestinationUrl(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://example.com/my-long-url"
                      required
                    />
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label htmlFor="shortDomain" className="block text-sm font-medium text-gray-700 mb-1">
                        Short link domain
                      </label>
                      <select
                        id="shortDomain"
                        value={shortDomain}
                        onChange={(e) => setShortDomain(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="bit.ly">bit.ly</option>
                      </select>
                    </div>

                    <div className="flex-1">
                      <label htmlFor="backHalf" className="block text-sm font-medium text-gray-700 mb-1">
                        Back-half (optional)
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">/</span>
                        <input
                          type="text"
                          id="backHalf"
                          value={backHalf}
                          onChange={(e) => setBackHalf(e.target.value)}
                          className="w-full pl-6 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="custom-path"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Title (optional)
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add a title for your link"
                    />
                  </div>
                </div>
              </div>

              {/* Sharing Options Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Sharing options</h2>
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform ${showAdvanced ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v11a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <h3 className="font-medium text-gray-900">Add to a Bitly Page</h3>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addToPage}
                        onChange={() => setAddToPage(!addToPage)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Advanced Settings Section */}
              {showAdvanced && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Advanced settings</h2>
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setShowAdvanced(!showAdvanced)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <h3 className="font-medium text-gray-900">UTM parameters</h3>
                          <p className="text-sm text-gray-500">Add UTM parameters to track link performance</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <h3 className="font-medium text-gray-900">Link expiration</h3>
                          <p className="text-sm text-gray-500">Set an expiration date for your link</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <Link
                  to="/links"
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-70"
                >
                  {loading ? "Creating..." : "Create your link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
