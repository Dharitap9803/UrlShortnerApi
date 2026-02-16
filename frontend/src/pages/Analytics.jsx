import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UrlAPI } from "../api";

const BACKEND_BASE = "http://localhost:8001";

function getDomainFromUrl(url) {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return u.hostname.replace("www.", "");
  } catch {
    return "link";
  }
}

function formatDateTime(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function groupVisitsByDay(visitHistory) {
  const counts = new Map();
  (visitHistory || []).forEach((v) => {
    if (!v || !v.timestamp) return;
    const d = new Date(v.timestamp);
    const key = d.toISOString().slice(0, 10); // YYYY-MM-DD
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  const entries = Array.from(counts.entries()).sort((a, b) => (a[0] < b[0] ? -1 : 1));
  return entries.map(([iso, count]) => {
    const d = new Date(iso);
    const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return { label, count };
  });
}

export default function Analytics() {
  const { id: shortId } = useParams();
  const navigate = useNavigate();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [profileName, setProfileName] = useState("Dharita Patel");

  useEffect(() => {
    const fetchLink = async () => {
      if (!shortId) {
        setError("Link not found.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError("");
        const { data } = await UrlAPI.getUrlAnalytics(shortId);
        setLink(data);
      } catch (err) {
        setError(err.response?.status === 404 ? "Link not found." : err.response?.data?.error || "Failed to load link.");
        if (err.response?.status === 401) navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchLink();
  }, [shortId, navigate]);

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem("user");
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        if (parsed.name) setProfileName(parsed.name);
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleProfileDropdown = () => setShowProfileDropdown(!showProfileDropdown);
  const closeProfileDropdown = () => setShowProfileDropdown(false);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const domain = link ? getDomainFromUrl(link.redirectURL) : "";
  const createdAt = link ? formatDateTime(link.createdAt) : "";
  const shortUrl = link ? `${BACKEND_BASE}/${link.shortId}` : "";
  const visitsByDay = useMemo(() => groupVisitsByDay(link?.visitHistory || []), [link]);
  const totalClicks = link?.visitHistory ? link.visitHistory.length : 0;
  const maxCount = visitsByDay.reduce((max, d) => (d.count > max ? d.count : max), 0) || 1;
  const profileInitials = profileName
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" onClick={closeProfileDropdown}>
      {/* Top bar - same as other pages */}
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
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="px-3 py-1.5 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700">
            Upgrade
          </button>
          <button className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium hover:bg-blue-700">
            ?
          </button>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleProfileDropdown();
              }}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-100"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                {profileInitials}
              </div>
              <span className="hidden sm:inline text-sm font-medium text-gray-700">{profileName}</span>
            </button>
            {showProfileDropdown && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowProfileDropdown(false);
                    handleSignOut();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - same as other pages */}
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

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-6">
            <button
              type="button"
              onClick={() => navigate("/link-details")}
              className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to list
            </button>

            {loading ? (
              <p className="text-gray-500">Loading analytics...</p>
            ) : error && !link ? (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <p className="text-red-600">{error}</p>
              </div>
            ) : link ? (
              <>
                {/* Top link summary card */}
                <section className="bg-white rounded-xl border border-gray-200 p-5 mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-white text-sm font-semibold">
                      {domain[0]?.toUpperCase() || "L"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h1 className="text-lg font-semibold text-gray-900">
                          {link.title || `${domain} • Link`}
                        </h1>
                      </div>
                      <div className="mt-1 flex items-center gap-2 flex-wrap text-sm">
                        <span className="text-blue-600 font-medium">{shortUrl}</span>
                      </div>
                      <div className="mt-1 text-sm text-gray-600 break-all">{link.redirectURL}</div>
                      <div className="mt-1 text-xs text-gray-400">No tags</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 text-xs text-gray-500">
                    <span>{createdAt}</span>
                  </div>
                </section>

                {/* QR Code + Bitly Page section */}
                <section className="bg-white rounded-xl border border-gray-200 p-5 mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-sm font-semibold text-gray-900 mb-3">QR Code</h2>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-lg border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-300 text-xs">
                        QR
                      </div>
                      <button className="px-3 py-2 border border-gray-300 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50">
                        Create QR Code
                      </button>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-gray-900 mb-3">Bitly Page</h2>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-300 text-xs">
                        B
                      </div>
                      <button className="px-3 py-2 border border-gray-300 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50">
                        Create Bitly Page
                      </button>
                    </div>
                  </div>
                </section>

                {/* Engagements over time */}
                <section className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-gray-900">Engagements over time</h2>
                    <button className="px-2 py-1 text-xs border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50">
                      Upgrade
                    </button>
                  </div>
                  {totalClicks === 0 || visitsByDay.length === 0 ? (
                    <p className="text-sm text-gray-500">No engagement data yet.</p>
                  ) : (
                    <div className="h-48 flex items-end gap-2 border-t border-gray-100 pt-4">
                      {visitsByDay.map((d) => (
                        <div key={d.label} className="flex flex-col items-center flex-1 min-w-[32px]">
                          <div
                            className="w-6 rounded-t-md bg-blue-500"
                            style={{ height: `${(d.count / maxCount) * 100}%` }}
                            title={`${d.count} clicks`}
                          />
                          <span className="mt-2 text-[10px] text-gray-500">{d.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
}

