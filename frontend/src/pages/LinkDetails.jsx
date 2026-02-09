import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LinkDetail() {
  // Sample data - In a real app, you would fetch this from your API
  const [links, setLinks] = useState([
    {
      id: 1,
      title: "account.mongodb.com",
      shortId: "4qosoeo",
      originalUrl: "https://account.mongodb.com/account/login?n=https://cloud.mongodb.com/v2/66a32684713fca7dc4dbd50b&nextHash=",
      date: "Feb 9, 2026",
      isTagged: false,
    },
    {
      id: 2,
      title: "YouTube",
      shortId: "4qpkyht",
      originalUrl: "https://www.youtube.com/",
      date: "Feb 7, 2026",
      isTagged: false,
    }
  ]);

  const [selectedLinks, setSelectedLinks] = useState([]);
  const [filter, setFilter] = useState("active");
  const [showMenu, setShowMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const navigate = useNavigate();

  // User profile data
  const user = {
    name: "Dharita Patel",
    email: "dharita2003@gmail.com",
    accountId: "o_68svc686ej",
    accountType: "Free account"
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  // Close profile dropdown when clicking outside
  const closeProfileDropdown = () => {
    setShowProfileDropdown(false);
  };

  // Toggle link selection
  const toggleLinkSelection = (id) => {
    if (selectedLinks.includes(id)) {
      setSelectedLinks(selectedLinks.filter(linkId => linkId !== id));
    } else {
      setSelectedLinks([...selectedLinks, id]);
    }
  };

  // Toggle menu for a specific link
  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setShowMenu(showMenu === id ? null : id);
  };

  // Copy link to clipboard
  const copyToClipboard = (shortId, e) => {
    e.stopPropagation();
    const shortUrl = `${window.location.origin}/${shortId}`;
    navigator.clipboard.writeText(shortUrl);
    alert("Copied to clipboard!");
  };

  // Filter links based on search term
  const filteredLinks = links.filter(link =>
    link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.shortId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" onClick={closeProfileDropdown}>
      {/* User Profile Header */}
      <header className="bg-white shadow-sm p-4 flex justify-end items-center relative">
        <div className="flex items-center space-x-4 cursor-pointer" onClick={(e) => {e.stopPropagation(); toggleProfileDropdown();}}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900">{user.name}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
          </div>
        </div>

        {/* Profile Dropdown */}
        {showProfileDropdown && (
          <div className="absolute top-16 right-4 w-64 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <div>{user.accountId}</div>
                <div>{user.accountType}</div>
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
                <button
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowProfileDropdown(false);
                    navigate('/home');
                  }}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`bg-white shadow-md ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
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
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <button onClick={toggleSidebar} className="p-2 rounded-md text-gray-500 hover:bg-gray-100 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Shortly Links</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/create" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Create new
                </Link>
              </div>
            </div>
          </header>

          {/* Search and Filter Bar */}
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search links"
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Show:</span>
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="active">Active</option>
                      <option value="archived">Archived</option>
                      <option value="all">All</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
                  </svg>
                  <span>Filter by created date</span>
                </button>
                <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  <span>Add filters</span>
                </button>
              </div>
            </div>
          </div>

          {/* Links List */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1">
            {filteredLinks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No links found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLinks.map((link) => (
                  <div key={link.id} className="bg-white rounded-lg shadow-sm p-4 relative">
                    {/* Link Content */}
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id={`link-${link.id}`}
                          type="checkbox"
                          checked={selectedLinks.includes(link.id)}
                          onChange={() => toggleLinkSelection(link.id)}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <h3 className="text-sm font-medium text-gray-900">{link.title}</h3>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center">
                            <span className="text-blue-600 text-sm break-all block mr-2">
                              {window.location.origin}/{link.shortId}
                            </span>
                            <button
                              onClick={(e) => copyToClipboard(link.shortId, e)}
                              className="text-gray-400 hover:text-gray-600"
                              title="Copy link"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M16 7h-3a1 1 0 00-1 1v3M19 16v.5a2.5 2.5 0 01-2.5 2.5H6.5A2.5 2.5 0 014 18.5V16" />
                              </svg>
                            </button>
                          </div>
                          <a href={link.originalUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm break-all block">
                            {link.originalUrl}
                          </a>
                        </div>
                        <div className="mt-3 flex items-center text-xs text-gray-500">
                          <span className="mr-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
                            </svg>
                            {link.date}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0 flex space-x-2">
                        <button
                          onClick={(e) => copyToClipboard(link.shortId, e)}
                          className="text-gray-400 hover:text-gray-600"
                          title="Copy link"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M16 7h-3a1 1 0 00-1 1v3M19 16v.5a2.5 2.5 0 01-2.5 2.5H6.5A2.5 2.5 0 014 18.5V16" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => toggleMenu(link.id, e)}
                          className="text-gray-400 hover:text-gray-600"
                          title="More options"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Menu Dropdown */}
                    {showMenu === link.id && (
                      <div className="absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            View link details
                          </button>
                          <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v11a2 2 0 002 2z" />
                            </svg>
                            View QR Code
                          </button>
                          <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Create Bitly Page
                          </button>
                          <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Hide link
                          </button>
                          <div className="border-t border-gray-200 my-1"></div>
                          <button className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
