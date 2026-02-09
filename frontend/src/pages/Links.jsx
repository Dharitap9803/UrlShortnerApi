import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CreateLink() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [destinationUrl, setDestinationUrl] = useState("https://example.com/my-long-url");
  const [shortDomain, setShortDomain] = useState("bit.ly");
  const [backHalf, setBackHalf] = useState("");
  const [title, setTitle] = useState("");
  const [addToPage, setAddToPage] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // User profile data
  const user = {
    name: "Dharita Patel",
    email: "dharita2003@gmail.com",
    accountId: "o_68svc686ej",
    accountType: "Free account"
  };

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

  // Close profile dropdown when clicking outside
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* User Profile Header */}
      <header className="bg-white shadow-sm p-4 flex justify-end items-center relative">
        <div className="flex items-center space-x-4 relative" ref={profileDropdownRef}>
          {/* Upgrade Button - Outside dropdown */}
          <Link to="/upgrade" className="bg-teal-600 text-white text-sm px-3 py-1 rounded hover:bg-teal-700 mr-4">
            Upgrade
          </Link>

          {/* Help Button - Outside dropdown */}
          <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 mr-2">
            ?
          </button>

          {/* Profile Button - Triggers dropdown */}
          <button
            onClick={toggleProfileDropdown}
            className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="text-sm font-medium text-gray-800">{user.name}</span>
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

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`bg-white shadow-md ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button onClick={toggleSidebar} className="p-2 rounded-md text-gray-500 hover:bg-gray-100 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div className="py-4">
                  <h1 className="text-2xl font-bold text-blue-700" style={{ fontFamily: "'Pacifico', cursive" }}>
                    Shortly
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <nav className="mt-6 px-4">
            <Link
              to="/home"
              className={`flex items-center py-2 px-3 rounded-lg mb-2 ${!isSidebarOpen ? 'justify-center' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              {isSidebarOpen && <span className="ml-3">Home</span>}
            </Link>
            <div className="border-t border-gray-200 my-2"></div>
            <Link
              to="/links"
              className={`flex items-center py-2 px-3 text-blue-600 bg-blue-50 rounded-lg mb-2 ${!isSidebarOpen ? 'justify-center' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
              {isSidebarOpen && <span className="ml-3">Links</span>}
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Create a new link</h1>

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
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create your link
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
