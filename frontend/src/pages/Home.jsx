import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [longUrl, setLongUrl] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [authWarning, setAuthWarning] = useState(false);
  const [language, setLanguage] = useState('en');

  const navigate = useNavigate();

  const baseEn = {
    platform: "Platform", solutions: "Solutions", pricing: "Pricing", resources: "Resources",
    login: "Log in", getQuote: "Get a Quote", signUp: "Sign up Free", heroTitle: "The Bitly Connections Platform",
    heroDesc: "All the products you need to build brand connections, manage links and QR Codes, and connect with audiences everywhere, in a single unified platform.",
    getStarted: "Get started for free", shortenLink: "Shorten a long link", noCreditCard: "No credit card required.",
    pasteUrl: "Paste your long link here", yourLink: "Your shortened link:", copy: "Copy",
    urlShortener: "URL Shortener", urlDesc: "A comprehensive solution to help make every point of connection between your content and your audience more powerful.",
    learnMore: "Learn more", footerTitle: "Adopted and loved by millions of users for over a decade", startNow: "Start now",
    whyBitly: "Why Bitly?", integrations: "Integrations & API", enterprise: "Enterprise Class", pricingFooter: "Pricing",
    products: "Products", urlShortenerFooter: "URL Shortener", qrCode: "QR Code Generator", barcodes: "2D Barcodes",
    analytics: "Analytics", pages: "Pages", features: "Features", linkInBio: "Link-in-bio", brandedLinks: "Branded Links",
    mobileLinks: "Mobile Links", utmCampaigns: "UTM Campaigns", digitalCards: "Digital Business Cards", solutions: "Solutions",
    retail: "Retail", cpg: "Consumer Packaged Goods", hospitality: "Hospitality", media: "Media & Entertainment",
    tech: "Tech Software & Hardware", healthcare: "Healthcare", insurance: "Insurance", financial: "Financial Services",
    professional: "Professional Services", education: "Education", resources: "Resources", blog: "Blog",
    guides: "Guides & eBooks", videos: "Videos & Webinars", stories: "Customer Stories", gallery: "QR Code Inspiration Gallery",
    developers: "Developers", apps: "Apps and Integrations", help: "Help Center", trust: "Trust Center",
    security: "Security Center", browser: "Browser Extension", mobileApp: "Mobile App", legal: "Legal",
    privacy: "Privacy Policy", cookies: "Cookie Policy", terms: "Terms of Service", acceptableUse: "Acceptable Use Policy",
    conduct: "Code of Conduct", transparency: "Transparency Report", company: "Company", about: "About Bitly",
    careers: "Careers", inclusion: "Inclusion at Bitly", partners: "Partners", press: "Press", contact: "Contact",
    reviews: "Reviews", accessibilityReport: "Accessibility Report", accessibilityStatement: "Accessibility Statement",
    copyright: "© 2026 Bitly | Handmade in New York City, Berlin, and all over the world."
  };

  const translations = {
    en: baseEn,
    de: baseEn,
    fr: baseEn,
    it: baseEn,
    pt: baseEn,
    es: baseEn,
    th: baseEn,
  };

  const t = translations[language] || baseEn;

  const handleShorten = (e) => {
    e.preventDefault();
    setAuthWarning(false);
    setShowWarning(false);

    if (!longUrl.trim()) {
      setShowWarning(true);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setAuthWarning(true);
      return;
    }

    let urlToShorten = longUrl.trim();
    if (!urlToShorten.startsWith("http://") && !urlToShorten.startsWith("https://")) {
      urlToShorten = `https://${urlToShorten}`;
    }
    navigate("/links", { state: { url: urlToShorten } });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-orange-500" style={{ fontFamily: "'Pacifico', cursive" }}>Shortly</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-transparent text-gray-300 hover:border-gray-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">{t.platform}</a>
                <a href="#" className="border-transparent text-gray-300 hover:border-gray-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">{t.solutions}</a>
                <a href="#" className="border-transparent text-gray-300 hover:border-gray-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">{t.pricing}</a>
                <a href="#" className="border-transparent text-gray-300 hover:border-gray-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">{t.resources}</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select className="bg-gray-800 border border-gray-700 text-gray-300 px-2 py-1 rounded text-sm" value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="en">🌐 English</option>
                <option value="de">🇩🇪 Deutsch</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="it">🇮🇹 Italiano</option>
                <option value="pt">🇵🇹 Português</option>
                <option value="es">🇪🇸 Español</option>
                <option value="th">🇹🇭 ภาษาไทย</option>
              </select>
              <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={() => navigate('/login')}>{t.login}</button>
              <a href="#" className="text-blue-400 hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium border border-blue-400 hover:bg-blue-900/20">{t.getQuote}</a>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700" onClick={() => navigate('/signup')}>{t.signUp}</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">{t.heroTitle}</h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-300">{t.heroDesc}</p>
          <div className="mt-8 flex justify-center space-x-4">
            <a href="#shortener" className="inline-block bg-blue-600 py-3 px-6 border border-transparent rounded-md text-base font-medium text-white hover:bg-blue-700">{t.getStarted} →</a>
            <a href="#" className="inline-block py-3 px-6 border border-gray-600 rounded-md text-base font-medium text-white hover:bg-gray-800">{t.getQuote} →</a>
          </div>
        </div>
      </div>

      {/* URL Shortener Section */}
      <div id="shortener" className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-900/20 rounded-2xl shadow-2xl border border-blue-500/30 overflow-hidden transition-all duration-300 hover:shadow-blue-500/30">
            <div className="flex border-b border-blue-500/30">
              <div className="flex">
                <button className="flex items-center px-6 py-4 text-white bg-blue-700/30 border-b-2 border-blue-400 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                  {t.urlShortener}
                </button>
              </div>
            </div>
            <div className="p-8 bg-blue-50/10 text-gray-900 rounded-b-2xl transition-all duration-300">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.shortenLink}</h2>
              <p className="text-gray-600 mb-8">{t.noCreditCard}</p>

              {authWarning && (
                <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
                  <p className="font-medium">Please log in or sign up to shorten links.</p>
                  <p className="text-sm mt-1">You need an account to create short links. Each user has their own links and link details.</p>
                  <div className="mt-3 flex gap-3">
                    <button type="button" onClick={() => navigate("/login")} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                      Log in
                    </button>
                    <button type="button" onClick={() => navigate("/signup")} className="px-4 py-2 border border-amber-600 text-amber-800 rounded-lg text-sm font-medium hover:bg-amber-100">
                      Sign up
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleShorten} className="space-y-6">
                <div>
                  <label htmlFor="destinationUrl" className="block text-sm font-medium text-gray-700 mb-2">{t.pasteUrl}</label>
                  <input type="url" id="destinationUrl" value={longUrl} onChange={(e) => { setLongUrl(e.target.value); setShowWarning(false); setAuthWarning(false); }}
                    placeholder="https://example.com/my-long-url" className={`w-full px-6 py-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${showWarning ? "border-red-500" : "border-blue-300"}`} style={{ minWidth: '500px' }} />
                  {showWarning && <p className="mt-2 text-sm text-red-600">Please enter a valid URL.</p>}
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center transition-all duration-200 transform hover:scale-[1.01]">
                  {t.getStarted}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="w-full max-w-md bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 transition-all duration-300 hover:shadow-blue-500/20">
              <div className="relative mb-4">
                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium text-white">yourbrnd.co</span>
                  </div>
                  <div className="text-sm text-gray-400">564 Engagements</div>
                  <div className="mt-2 flex items-center space-x-1">
                    <span className="text-xs bg-gray-600 px-2 py-1 rounded">📍 Brooklyn</span>
                    <span className="text-xs bg-gray-600 px-2 py-1 rounded">34</span>
                    <span className="text-xs bg-gray-600 px-2 py-1 rounded">📍 San Francisco</span>
                    <span className="text-xs bg-gray-600 px-2 py-1 rounded">18</span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t.urlShortener}</h3>
              <p className="text-gray-400">{t.urlDesc}</p>
              <div className="mt-4 flex items-center text-sm text-blue-400">{t.learnMore} →</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted by brands */}
      <div className="py-12 bg-gray-900/60 border-y border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs sm:text-sm uppercase tracking-[0.25em] text-gray-400 mb-6">
            Trusted by teams of all sizes
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-8 text-gray-400 text-xs sm:text-sm font-medium opacity-80">
            <span className="flex items-center justify-center">E‑commerce</span>
            <span className="flex items-center justify-center">SaaS</span>
            <span className="flex items-center justify-center">Agencies</span>
            <span className="flex items-center justify-center">Creators</span>
            <span className="flex items-center justify-center">Customer support</span>
            <span className="flex items-center justify-center">Internal tools</span>
          </div>
        </div>
      </div>

      {/* Metrics strip */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="bg-gray-800/60 border border-gray-700 rounded-xl px-6 py-5">
              <p className="text-3xl sm:text-4xl font-extrabold text-white">99.9%</p>
              <p className="mt-1 text-sm text-gray-400">Platform uptime</p>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-xl px-6 py-5">
              <p className="text-3xl sm:text-4xl font-extrabold text-white">500M+</p>
              <p className="mt-1 text-sm text-gray-400">Clicks tracked each month</p>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-xl px-6 py-5">
              <p className="text-3xl sm:text-4xl font-extrabold text-white">190+</p>
              <p className="mt-1 text-sm text-gray-400">Countries with active links</p>
            </div>
          </div>
        </div>
      </div>

      {/* Use cases / value props */}
      <div className="py-16 bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-white mb-2">Built for modern teams</h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Shortly gives marketers, developers, and operators a single place to manage every link, QR code, and landing page they ship.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">For marketing teams</h3>
              <p className="text-gray-400 text-sm mb-3">
                Launch campaigns faster with branded links, QR codes on every asset, and analytics that tie engagement back to channels.
              </p>
              <ul className="text-gray-400 text-xs space-y-1">
                <li>• Track performance by channel and campaign</li>
                <li>• Standardize UTM parameters across your team</li>
                <li>• Share dashboards with stakeholders in seconds</li>
              </ul>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">For developers & product</h3>
              <p className="text-gray-400 text-sm mb-3">
                Use a stable API to generate links programmatically, power in‑app sharing, and build custom workflows around your data.
              </p>
              <ul className="text-gray-400 text-xs space-y-1">
                <li>• REST API for links, QR codes, and pages</li>
                <li>• Webhooks for click and conversion events</li>
                <li>• Secure by default with role‑based access</li>
              </ul>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">For operations & support</h3>
              <p className="text-gray-400 text-sm mb-3">
                Keep every customer‑facing link up‑to‑date, with change history and controls that make compliance and governance simple.
              </p>
              <ul className="text-gray-400 text-xs space-y-1">
                <li>• Update destinations without breaking links</li>
                <li>• Audit who changed what and when</li>
                <li>• Centralize ownership of business‑critical URLs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-6">{t.footerTitle}</h2>
          <button className="bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-orange-600 transition-all duration-200">{t.startNow} →</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            <div><h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">{t.whyBitly}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.integrations}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.enterprise}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.pricingFooter}</a></li>
              </ul>
            </div>
            <div><h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">{t.products}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.urlShortenerFooter}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.qrCode}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.barcodes}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.analytics}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.pages}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm font-bold">{t.features}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.linkInBio}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.brandedLinks}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.mobileLinks}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.utmCampaigns}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.digitalCards}</a></li>
              </ul>
            </div>
            <div><h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">{t.solutions}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.retail}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.cpg}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.hospitality}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.media}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.tech}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.healthcare}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.insurance}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.financial}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.professional}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.education}</a></li>
              </ul>
            </div>
            <div><h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">{t.resources}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.blog}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.guides}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.videos}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.stories}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.gallery}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.developers}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.apps}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.help}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.trust}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.security}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.browser}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.mobileApp}</a></li>
              </ul>
            </div>
            <div><h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">{t.legal}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.privacy}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.cookies}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.terms}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.acceptableUse}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.conduct}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.transparency}</a></li>
              </ul>
            </div>
            <div><h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">{t.company}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.about}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.careers}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.inclusion}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.partners}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.press}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.contact}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.reviews}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.accessibilityReport}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.accessibilityStatement}</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6">
              <span className="text-orange-500 font-bold text-xl" style={{ fontFamily: "'Pacifico', cursive" }}>Shortly</span>
              <span className="text-gray-400 text-sm">{t.copyright}</span>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg></a>
              <a href="#" className="text-gray-400 hover:text-white"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.417 2.865 8.18 6.839 8.18 2.031 0 2.859-.971 3.485-1.765.601-.773.997-1.675.997-2.906 0-.808-.306-1.49-.773-2.017-.467-.527-1.107-.811-2.17-.811-.837 0-1.628.181-2.54.631C9.13 11.762 8.5 10.521 8.5 9.003c0-1.519.535-2.838 1.53-3.875C11.06 3.695 12.31 2.5 14.607 2.5 16.064 2.5 17.9 4.107 17.9 7.393 0 1.806-.647 3.423-1.707 4.607-1.06 1.182-2.424 1.771-4.155 1.771-1.73 0-3.215-.584-4.45-1.724-.912-.81-.932-2.147-.095-3.345.837-1.198 2.147-1.24 3.982-.584 1.835.64 3.426 1.707 4.607 1.707 1.182.06 2.271-.18 3.215-.584z" clipRule="evenodd"/></svg></a>
              <a href="#" className="text-gray-400 hover:text-white"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/></svg></a>
              <a href="#" className="text-gray-400 hover:text-white"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 3.723v.08c0 2.316-.012 2.684-.06 3.723-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-3.723.06h-.08c-2.316 0-2.684-.012-3.723-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-2.607 0-1.228.013-1.587.06-2.607.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.404 2.537c.636-.246 1.363-.415 2.427-.465C8.621 2.013 8.965 2 9.685 2h2.63zm-.023 6.977c-1.875 0-3.735.05-5.547.144a2.18 2.18 0 00-1.43.602 42.277 42.277 0 00-1.035 1.082c-.29.31-.43.697-.43 1.148 0 .45.14.838.43 1.147.604.384 1.28 1.057 1.99 2.013.603.85.988 1.648 1.186 2.14.196.492.196.98.196 1.468 0 .488-.196.976-.196 1.468-.196.492 0 .98-.196 1.468-.588.196-.196.384-.488.588-.88.392-.392.588-.88.588-1.468 0-.492-.196-.98-.588-1.468a42.26 42.26 0 00-1.035-1.082 2.178 2.178 0 00-1.43-.602c-1.812-.094-3.672-.144-5.547-.144h-.023a2.18 2.18 0 00-1.43.602 42.275 42.275 0 00-1.035 1.082c-.29.31-.43.697-.43 1.148 0 .45.14.838.43 1.147.604.385 1.28 1.057 1.99 2.013.603.85.988 1.648 1.186 2.14.196.492.196.98.196 1.468 0 .488-.196.976-.196 1.468-.196.492 0 .98-.196 1.468-.588.196-.196.384-.488.588-.88.392-.392.588-.88.588-1.468 0-.492-.196-.98-.588-1.468a42.26 42.26 0 00-1.035-1.082 2.178 2.178 0 00-1.43-.602c-1.812-.094-3.672-.144-5.547-.144z" clipRule="evenodd"/></svg></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
