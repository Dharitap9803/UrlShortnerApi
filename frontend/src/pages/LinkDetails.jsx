import { useState, useEffect } from "react";
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

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function parseDDMMYYYY(str) {
  const parts = str.split("/");
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  const d = new Date(year, month, day);
  if (isNaN(d.getTime())) return null;
  return d;
}

function toDDMMYYYY(d) {
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

function getCalendarDays(year, month) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startPad = first.getDay();
  const daysInMonth = last.getDate();
  const prevMonth = new Date(year, month, 0);
  const prevDays = prevMonth.getDate();
  const rows = [];
  let row = [];
  for (let i = 0; i < startPad; i++) {
    row.push({ day: prevDays - startPad + i + 1, current: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    row.push({ day: d, current: true });
    if (row.length === 7) {
      rows.push(row);
      row = [];
    }
  }
  if (row.length) {
    let next = 1;
    while (row.length < 7) row.push({ day: next++, current: false });
    rows.push(row);
  }
  return rows;
}

export default function LinkDetails() {
  const { id: shortId } = useParams();
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const [singleLink, setSingleLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [profileName, setProfileName] = useState("Dharita Patel");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState("Active");
  const [selectedIds, setSelectedIds] = useState([]);
  const [listViewMode, setListViewMode] = useState("compact"); // "compact" | "list" | "grid" — first button = compact
  const [showDateFilterModal, setShowDateFilterModal] = useState(false);
  const [dateFrom, setDateFrom] = useState(() => {
    const d = new Date();
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  });
  const [dateTo, setDateTo] = useState(() => {
    const d = new Date();
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  });
  const [calendarMonth, setCalendarMonth] = useState(() => new Date());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(() => new Date());
  const [dateRangeFilter, setDateRangeFilter] = useState(null); // { from: Date, to: Date } or null

  const isListView = !shortId;

  useEffect(() => {
    // Load user name from localStorage if available
    try {
      const rawUser = localStorage.getItem("user");
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        if (parsed.name) setProfileName(parsed.name);
      }
    } catch {
      // ignore parse errors
    }

    if (isListView) {
      const fetchLinks = async () => {
        try {
          setLoading(true);
          setError("");
          const { data } = await UrlAPI.getUserUrls();
          setLinks(data.links || []);
        } catch (err) {
          setError(err.response?.status === 401 ? "Please log in." : err.response?.data?.error || "Failed to load links.");
          if (err.response?.status === 401) navigate("/login");
        } finally {
          setLoading(false);
        }
      };
      fetchLinks();
    } else {
      const fetchLink = async () => {
        try {
          setLoading(true);
          setError("");
          const { data } = await UrlAPI.getUrlAnalytics(shortId);
          setSingleLink(data);
        } catch (err) {
          setError(err.response?.status === 404 ? "Link not found." : err.response?.data?.error || "Failed to load link.");
          if (err.response?.status === 401) navigate("/login");
        } finally {
          setLoading(false);
        }
      };
      fetchLink();
    }
  }, [shortId, isListView, navigate]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleProfileDropdown = () => setShowProfileDropdown(!showProfileDropdown);
  const closeProfileDropdown = () => setShowProfileDropdown(false);

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert("Copied to clipboard!");
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  let filteredLinks = links.filter(
    (l) =>
      l.shortId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.redirectURL?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getDomainFromUrl(l.redirectURL).toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (dateRangeFilter) {
    const from = dateRangeFilter.from.getTime();
    const toEnd = new Date(dateRangeFilter.to);
    toEnd.setHours(23, 59, 59, 999);
    const to = toEnd.getTime();
    filteredLinks = filteredLinks.filter((l) => {
      const t = l.createdAt ? new Date(l.createdAt).getTime() : 0;
      return t >= from && t <= to;
    });
  }

  const calendarDays = getCalendarDays(calendarMonth.getFullYear(), calendarMonth.getMonth());
  const monthName = calendarMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const profileInitials = profileName
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const applyQuickRange = (type) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let from = new Date(today);
    let to = new Date(today);
    if (type === "Last hour") {
      to = new Date();
      from = new Date(to.getTime() - 60 * 60 * 1000);
    } else if (type === "Today") {
      from = new Date(today);
      to = new Date(today);
    } else if (type === "Last 7 days") {
      from.setDate(from.getDate() - 6);
    } else if (type === "Last 30 days") {
      from.setDate(from.getDate() - 29);
    } else if (type === "Last 60 days") {
      from.setDate(from.getDate() - 59);
    } else if (type === "Last 90 days") {
      from.setDate(from.getDate() - 89);
    }
    setDateFrom(toDDMMYYYY(from));
    setDateTo(toDDMMYYYY(to));
    setSelectedCalendarDate(new Date(to));
  };

  const handleApplyDateFilter = () => {
    const from = parseDDMMYYYY(dateFrom);
    const to = parseDDMMYYYY(dateTo);
    if (from && to) setDateRangeFilter({ from, to });
    setShowDateFilterModal(false);
  };

  const handleCalendarSelect = (day, isCurrent) => {
    if (!isCurrent) return;
    const d = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day);
    setSelectedCalendarDate(d);
    const str = toDDMMYYYY(d);
    setDateFrom(str);
    setDateTo(str);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" onClick={closeProfileDropdown}>
      {/* Filter by created date modal */}
      {showDateFilterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setShowDateFilterModal(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Filter by created date</h2>
              <button onClick={() => setShowDateFilterModal(false)} className="p-1 rounded hover:bg-gray-100 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <input
                type="text"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                placeholder="DD/MM/YYYY"
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                placeholder="DD/MM/YYYY"
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{monthName}</span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setCalendarMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1))}
                    className="p-1.5 rounded hover:bg-gray-100 text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalendarMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1))}
                    className="p-1.5 rounded hover:bg-gray-100 text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-0.5 text-center text-xs text-gray-500 font-medium mb-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-0.5">
                {calendarDays.flat().map((cell, i) => {
                  const isSelected =
                    cell.current &&
                    selectedCalendarDate.getDate() === cell.day &&
                    selectedCalendarDate.getMonth() === calendarMonth.getMonth() &&
                    selectedCalendarDate.getFullYear() === calendarMonth.getFullYear();
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleCalendarSelect(cell.day, cell.current)}
                      className={`w-8 h-8 rounded-full text-sm ${!cell.current ? "text-gray-300" : "text-gray-900 hover:bg-gray-100"} ${isSelected ? "bg-blue-600 text-white hover:bg-blue-700" : ""}`}
                    >
                      {cell.day}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Last hour", "Today", "Last 7 days", "Last 30 days", "Last 60 days", "Last 90 days"].map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => applyQuickRange(label)}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200"
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowDateFilterModal(false)} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleApplyDateFilter} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top bar - logo, search, upgrade, help, profile */}
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
              onClick={(e) => { e.stopPropagation(); toggleProfileDropdown(); }}
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
                  onClick={(e) => { e.stopPropagation(); setShowProfileDropdown(false); handleSignOut(); }}
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
        {/* Collapsed sidebar - icons only */}
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
              className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${!isSidebarOpen ? "mx-auto" : "w-full px-3"} text-gray-600 hover:bg-gray-100`}
              title="Home"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {isSidebarOpen && <span className="ml-2 text-sm">Home</span>}
            </Link>
            <Link
              to="/link-details"
              className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${!isSidebarOpen ? "mx-auto bg-blue-50 text-blue-600" : "w-full px-3 bg-blue-50 text-blue-600"}`}
              title="Links"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              {isSidebarOpen && <span className="ml-2 text-sm font-medium">Links</span>}
            </Link>
            <button className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${!isSidebarOpen ? "mx-auto" : "w-full px-3"} text-gray-600 hover:bg-gray-100`} title="QR codes">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              {isSidebarOpen && <span className="ml-2 text-sm">QR codes</span>}
            </button>
            <button className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${!isSidebarOpen ? "mx-auto" : "w-full px-3"} text-gray-600 hover:bg-gray-100`} title="Custom links">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {isSidebarOpen && <span className="ml-2 text-sm">Custom links</span>}
            </button>
            <button className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${!isSidebarOpen ? "mx-auto" : "w-full px-3"} text-gray-600 hover:bg-gray-100`} title="Analytics">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {isSidebarOpen && <span className="ml-2 text-sm">Analytics</span>}
            </button>
            <button className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${!isSidebarOpen ? "mx-auto" : "w-full px-3"} text-gray-600 hover:bg-gray-100`} title="Integrations">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
              {isSidebarOpen && <span className="ml-2 text-sm">Integrations</span>}
            </button>
            <button className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 mt-4 ${!isSidebarOpen ? "mx-auto" : "w-full px-3"} text-gray-600 hover:bg-gray-100`} title="Settings">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {isSidebarOpen && <span className="ml-2 text-sm">Settings</span>}
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col min-w-0 bg-gray-50">
          {isListView ? (
            <>
              {/* Title + Create link */}
              <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Shortly Links</h1>
                <Link to="/links" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                  Create link
                </Link>
              </div>

              {/* Search + filters */}
              <div className="bg-white border-b border-gray-200 px-6 py-3">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 min-w-[180px]">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search links"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => setShowDateFilterModal(true)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md border border-gray-200"
                  >
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {dateRangeFilter
                      ? `${dateRangeFilter.from.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${dateRangeFilter.to.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
                      : "Filter by created date"}
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md border border-gray-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Add filters
                  </button>
                  <span className="text-sm text-gray-500">Showing all {filteredLinks.length} results</span>
                  {(dateRangeFilter || searchTerm) && (
                    <button onClick={() => { setDateRangeFilter(null); setSearchTerm(""); }} className="text-sm text-blue-600 hover:underline">
                      Clear all
                    </button>
                  )}
                </div>
              </div>

              {/* Actions: 0 selected, Export, Hide, Tag, view mode, Show: Active */}
              <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      checked={selectedIds.length > 0 && selectedIds.length === filteredLinks.length}
                      onChange={(e) => (e.target.checked ? setSelectedIds(filteredLinks.map((l) => l._id)) : setSelectedIds([]))}
                    />
                    <span>{selectedIds.length} selected</span>
                  </label>
                  <button className="text-sm text-gray-600 hover:text-gray-900">Export</button>
                  <button className="text-sm text-gray-600 hover:text-gray-900">Hide</button>
                  <button className="text-sm text-gray-600 hover:text-gray-900">Tag</button>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setListViewMode("compact")}
                    className={`p-2 rounded-md ${listViewMode === "compact" ? "bg-gray-200 text-gray-700" : "hover:bg-gray-100 text-gray-500"}`}
                    title="List view (compact)"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setListViewMode("list")}
                    className={`p-2 rounded-md ${listViewMode === "list" ? "bg-gray-200 text-gray-700" : "hover:bg-gray-100 text-gray-500"}`}
                    title="List view"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setListViewMode("grid")}
                    className={`p-2 rounded-md ${listViewMode === "grid" ? "bg-gray-200 text-gray-700" : "hover:bg-gray-100 text-gray-500"}`}
                    title="Grid view"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <select
                    value={showFilter}
                    onChange={(e) => setShowFilter(e.target.value)}
                    className="ml-2 text-sm border border-gray-300 rounded px-2 py-1.5 text-gray-700"
                  >
                    <option>Show: Active</option>
                    <option>Show: Archived</option>
                    <option>Show: All</option>
                  </select>
                </div>
              </div>

              {/* Content area */}
              <div className="flex-1 overflow-auto px-6 py-4">
                {loading ? (
                  <p className="text-gray-500">Loading your links...</p>
                ) : error ? (
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <p className="text-red-600">{error}</p>
                    <Link to="/link-details" className="inline-block mt-2 text-blue-600 hover:underline text-sm">Back to Link details</Link>
                  </div>
                ) : filteredLinks.length === 0 ? (
                  <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
                    <p>You have no links yet.</p>
                    <Link to="/links" className="inline-block mt-3 text-blue-600 hover:underline">Create your first link</Link>
                  </div>
                ) : (
                  <div
                    className={
                      listViewMode === "compact"
                        ? "space-y-1"
                        : listViewMode === "grid"
                        ? "grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
                        : "space-y-0"
                    }
                  >
                    {filteredLinks.map((link, index) => {
                      const domain = getDomainFromUrl(link.redirectURL);
                      const shortUrl = `${BACKEND_BASE}/${link.shortId}`;
                      const created = link.createdAt ? formatDate(link.createdAt) : "—";
                      const longUrlTruncated = link.redirectURL?.length > 55 ? link.redirectURL.slice(0, 55) + "…" : link.redirectURL;

                      if (listViewMode === "compact") {
                        return (
                          <div key={link._id}>
                            <div className="bg-gray-100/80 hover:bg-gray-100 border border-gray-200/80 rounded-lg px-4 py-3 flex items-center gap-3 shadow-sm">
                              <input
                                type="checkbox"
                                checked={selectedIds.includes(link._id)}
                                onChange={() => toggleSelect(link._id)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 flex-shrink-0"
                              />
                              <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center flex-shrink-0">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 text-sm truncate">{domain} - untitled</p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm font-medium truncate hover:underline">
                                    {shortUrl.replace(BACKEND_BASE + "/", "")}
                                  </a>
                                  <button onClick={() => copyToClipboard(shortUrl)} className="text-gray-400 hover:text-gray-600 flex-shrink-0" title="Copy">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                  </button>
                                </div>
                                <a href={link.redirectURL} target="_blank" rel="noopener noreferrer" className="text-gray-500 text-xs truncate block mt-0.5 hover:text-blue-600">
                                  {longUrlTruncated}
                                </a>
                              </div>
                              <div className="flex items-center gap-3 flex-shrink-0">
                                <span className="flex items-center gap-1 text-xs text-gray-500">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                  </svg>
                                  Click data
                                </span>
                                <button className="p-1 rounded hover:bg-gray-200 text-gray-500" title="More options">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            {index === 0 && (
                              <div className="my-3 px-4 py-3 bg-teal-50/90 border border-teal-100 rounded-lg flex items-center gap-3">
                                <svg className="w-5 h-5 text-teal-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <p className="text-sm text-teal-800">
                                  Change a link's destination, even after you've shared it. Get redirects with every plan.{" "}
                                  <a href="#" className="font-medium text-teal-600 hover:underline">View plans</a>
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      }

                      return (
                        <div key={link._id}>
                          <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-4 hover:border-gray-300 transition-colors">
                            <div className="flex items-center h-5 pt-0.5">
                              <input
                                type="checkbox"
                                checked={selectedIds.includes(link._id)}
                                onChange={() => toggleSelect(link._id)}
                                className="h-4 w-4 text-blue-600 rounded border-gray-300"
                              />
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 truncate">{domain} - untitled</p>
                              <div className="mt-1 flex items-center gap-2 flex-wrap">
                                <span className="text-blue-600 text-sm font-medium">{shortUrl}</span>
                                <button onClick={() => copyToClipboard(shortUrl)} className="text-gray-400 hover:text-gray-600" title="Copy">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M16 7h-3a1 1 0 00-1 1v3M19 16v.5a2.5 2.5 0 01-2.5 2.5H6.5A2.5 2.5 0 014 18.5V16" />
                                  </svg>
                                </button>
                              </div>
                              <a href={link.redirectURL} target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm truncate block mt-0.5 hover:text-blue-600">
                                → {link.redirectURL}
                              </a>
                              <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                  </svg>
                                  Click data
                                </span>
                                <span className="flex items-center gap-1">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  {created}
                                </span>
                                <span className="flex items-center gap-1">No tags</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-0.5 flex-shrink-0">
                              <button onClick={() => navigate(`/link-details/${link.shortId}/edit`)} className="p-1.5 rounded hover:bg-gray-100 text-gray-500" title="Edit">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                              <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500" title="Share">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367-2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                              </button>
                              <button onClick={() => navigate(`/link-details/${link.shortId}/analytics`)} className="p-1.5 rounded hover:bg-gray-100 text-gray-500" title="Analytics">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                              </button>
                              <button className="p-1.5 rounded hover:bg-gray-100 text-gray-500" title="More options">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          {index === 0 && (
                            <div className="my-4 px-4 py-3 bg-sky-50 border border-sky-100 rounded-lg flex items-center gap-3">
                              <svg className="w-5 h-5 text-sky-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <p className="text-sm text-sky-800">
                                Change a link's destination, even after you've shared it. Get redirects with every plan.{" "}
                                <a href="#" className="font-medium text-sky-600 hover:underline">View plans</a>
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {filteredLinks.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-400">You've reached the end of your links</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Single link detail view */
            <div className="flex-1 overflow-auto px-6 py-4">
              {loading ? (
                <p className="text-gray-500">Loading link...</p>
              ) : error ? (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <p className="text-red-600">{error}</p>
                  <Link to="/link-details" className="inline-block mt-2 text-blue-600 hover:underline text-sm">Back to Link details</Link>
                </div>
              ) : singleLink ? (
                <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Short link</h2>
                    <button onClick={() => copyToClipboard(`${BACKEND_BASE}/${singleLink.shortId}`)} className="text-sm text-blue-600 hover:underline">Copy</button>
                  </div>
                  <a href={`${BACKEND_BASE}/${singleLink.shortId}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 break-all block mb-4">
                    {BACKEND_BASE}/{singleLink.shortId}
                  </a>
                  <h3 className="text-sm font-medium text-gray-700 mt-4">Destination URL</h3>
                  <a href={singleLink.redirectURL} target="_blank" rel="noopener noreferrer" className="text-gray-600 break-all block mb-4">{singleLink.redirectURL}</a>
                  <p className="text-sm text-gray-500">Clicks: {(singleLink.visitHistory && singleLink.visitHistory.length) || 0}</p>
                  <Link to="/link-details" className="inline-block mt-6 text-blue-600 hover:underline text-sm">Back to Link details</Link>
                </div>
              ) : null}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
