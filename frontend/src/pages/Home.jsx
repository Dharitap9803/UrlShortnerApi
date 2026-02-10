import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [longUrl, setLongUrl] = useState("https://example.com/my-long-url");
  const [shortUrl, setShortUrl] = useState("");
  const [isShortened, setIsShortened] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [language, setLanguage] = useState('en');

  const navigate = useNavigate();

  // Complete language translations
  const translations = {
    en: {
      // Navigation
      platform: "Platform",
      solutions: "Solutions",
      pricing: "Pricing",
      resources: "Resources",
      login: "Log in",
      getQuote: "Get a Quote",
      signUp: "Sign up Free",

      // Hero Section
      heroTitle: "The Bitly Connections Platform",
      heroDesc: "All the products you need to build brand connections, manage links and QR Codes, and connect with audiences everywhere, in a single unified platform.",
      getStarted: "Get started for free",

      // URL Shortener Section
      shortenLink: "Shorten a long link",
      noCreditCard: "No credit card required.",
      pasteUrl: "Paste your long link here",
      yourLink: "Your shortened link:",
      copy: "Copy",

      // Features Section
      urlShortener: "URL Shortener",
      urlDesc: "A comprehensive solution to help make every point of connection between your content and your audience more powerful.",
      learnMore: "Learn more",

      // Footer CTA
      footerTitle: "Adopted and loved by millions of users for over a decade",
      startNow: "Start now",

      // Footer
      whyBitly: "Why Bitly?",
      integrations: "Integrations & API",
      enterprise: "Enterprise Class",
      pricingFooter: "Pricing",
      products: "Products",
      urlShortenerFooter: "URL Shortener",
      qrCode: "QR Code Generator",
      barcodes: "2D Barcodes",
      analytics: "Analytics",
      pages: "Pages",
      features: "Features",
      linkInBio: "Link-in-bio",
      brandedLinks: "Branded Links",
      mobileLinks: "Mobile Links",
      utmCampaigns: "UTM Campaigns",
      digitalCards: "Digital Business Cards",
      solutions: "Solutions",
      retail: "Retail",
      cpg: "Consumer Packaged Goods",
      hospitality: "Hospitality",
      media: "Media & Entertainment",
      tech: "Tech Software & Hardware",
      healthcare: "Healthcare",
      insurance: "Insurance",
      financial: "Financial Services",
      professional: "Professional Services",
      education: "Education",
      resources: "Resources",
      blog: "Blog",
      guides: "Guides & eBooks",
      videos: "Videos & Webinars",
      stories: "Customer Stories",
      gallery: "QR Code Inspiration Gallery",
      developers: "Developers",
      apps: "Apps and Integrations",
      help: "Help Center",
      trust: "Trust Center",
      security: "Security Center",
      browser: "Browser Extension",
      mobileApp: "Mobile App",
      legal: "Legal",
      privacy: "Privacy Policy",
      cookies: "Cookie Policy",
      terms: "Terms of Service",
      acceptableUse: "Acceptable Use Policy",
      conduct: "Code of Conduct",
      transparency: "Transparency Report",
      company: "Company",
      about: "About Bitly",
      careers: "Careers",
      inclusion: "Inclusion at Bitly",
      partners: "Partners",
      press: "Press",
      contact: "Contact",
      reviews: "Reviews",
      accessibilityReport: "Accessibility Report",
      accessibilityStatement: "Accessibility Statement",
      copyright: "© 2026 Bitly | Handmade in New York City, Berlin, and all over the world."
    },
    de: {
      // Navigation
      platform: "Plattform",
      solutions: "Lösungen",
      pricing: "Preise",
      resources: "Ressourcen",
      login: "Anmelden",
      getQuote: "Angebot erhalten",
      signUp: "Kostenlos registrieren",

      // Hero Section
      heroTitle: "Die Bitly-Verbindungsplattform",
      heroDesc: "Alle Produkte, die Sie benötigen, um Markenverbindungen aufzubauen, Links und QR-Codes zu verwalten und mit Ihrem Publikum überall zu verbinden - auf einer einzigen Plattform.",
      getStarted: "Kostenlos starten",

      // URL Shortener Section
      shortenLink: "Langen Link verkürzen",
      noCreditCard: "Keine Kreditkarte erforderlich.",
      pasteUrl: "Fügen Sie hier Ihren langen Link ein",
      yourLink: "Ihr verkürzter Link:",
      copy: "Kopieren",

      // Features Section
      urlShortener: "URL-Verkürzer",
      urlDesc: "Eine umfassende Lösung, um jeden Verbindungspunkt zwischen Ihren Inhalten und Ihrem Publikum leistungsfähiger zu gestalten.",
      learnMore: "Mehr erfahren",

      // Footer CTA
      footerTitle: "Von Millionen von Nutzern seit über einem Jahrzehnt genutzt und geliebt",
      startNow: "Jetzt starten",

      // Footer
      whyBitly: "Warum Bitly?",
      integrations: "Integrationen & API",
      enterprise: "Enterprise-Klasse",
      pricingFooter: "Preise",
      products: "Produkte",
      urlShortenerFooter: "URL-Verkürzer",
      qrCode: "QR-Code-Generator",
      barcodes: "2D-Barcodes",
      analytics: "Analysen",
      pages: "Seiten",
      features: "Funktionen",
      linkInBio: "Link-in-Bio",
      brandedLinks: "Markenlinks",
      mobileLinks: "Mobile Links",
      utmCampaigns: "UTM-Kampagnen",
      digitalCards: "Digitale Visitenkarten",
      solutions: "Lösungen",
      retail: "Einzelhandel",
      cpg: "Konsumgüter",
      hospitality: "Gastgewerbe",
      media: "Medien & Unterhaltung",
      tech: "Technologie-Software & -Hardware",
      healthcare: "Gesundheitswesen",
      insurance: "Versicherungen",
      financial: "Finanzdienstleistungen",
      professional: "Professionelle Dienstleistungen",
      education: "Bildung",
      resources: "Ressourcen",
      blog: "Blog",
      guides: "Anleitungen & eBooks",
      videos: "Videos & Webinare",
      stories: "Kundengeschichten",
      gallery: "QR-Code-Inspirationsgalerie",
      developers: "Entwickler",
      apps: "Apps und Integrationen",
      help: "Hilfecenter",
      trust: "Vertrauenscenter",
      security: "Sicherheitscenter",
      browser: "Browser-Erweiterung",
      mobileApp: "Mobile App",
      legal: "Rechtliches",
      privacy: "Datenschutzrichtlinie",
      cookies: "Cookie-Richtlinie",
      terms: "Nutzungsbedingungen",
      acceptableUse: "Akzeptable Nutzungsrichtlinie",
      conduct: "Verhaltenskodex",
      transparency: "Transparenzbericht",
      company: "Unternehmen",
      about: "Über Bitly",
      careers: "Karriere",
      inclusion: "Inklusion bei Bitly",
      partners: "Partner",
      press: "Presse",
      contact: "Kontakt",
      reviews: "Bewertungen",
      accessibilityReport: "Barrierefreiheitsbericht",
      accessibilityStatement: "Barrierefreiheitserklärung",
      copyright: "© 2026 Bitly | Handgefertigt in New York City, Berlin und auf der ganzen Welt."
    },
    fr: {
      // Navigation
      platform: "Plateforme",
      solutions: "Solutions",
      pricing: "Tarifs",
      resources: "Ressources",
      login: "Connexion",
      getQuote: "Obtenir un devis",
      signUp: "S'inscrire gratuitement",

      // Hero Section
      heroTitle: "La Plateforme de Connexions Bitly",
      heroDesc: "Tous les produits dont vous avez besoin pour créer des connexions de marque, gérer les liens et les codes QR, et vous connecter avec votre audience partout, sur une plateforme unifiée.",
      getStarted: "Commencer gratuitement",

      // URL Shortener Section
      shortenLink: "Raccourcir un long lien",
      noCreditCard: "Aucune carte de crédit requise.",
      pasteUrl: "Collez votre long lien ici",
      yourLink: "Votre lien raccourci :",
      copy: "Copier",

      // Features Section
      urlShortener: "Raccourcisseur d'URL",
      urlDesc: "Une solution complète pour rendre chaque point de connexion entre votre contenu et votre audience plus puissant.",
      learnMore: "En savoir plus",

      // Footer CTA
      footerTitle: "Adopté et aimé par des millions d'utilisateurs depuis plus d'une décennie",
      startNow: "Commencer maintenant",

      // Footer
      whyBitly: "Pourquoi Bitly ?",
      integrations: "Intégrations & API",
      enterprise: "Classe Entreprise",
      pricingFooter: "Tarifs",
      products: "Produits",
      urlShortenerFooter: "Raccourcisseur d'URL",
      qrCode: "Générateur de QR Code",
      barcodes: "Codes-barres 2D",
      analytics: "Analytique",
      pages: "Pages",
      features: "Fonctionnalités",
      linkInBio: "Lien dans la bio",
      brandedLinks: "Liens de marque",
      mobileLinks: "Liens mobiles",
      utmCampaigns: "Campagnes UTM",
      digitalCards: "Cartes de visite numériques",
      solutions: "Solutions",
      retail: "Vente au détail",
      cpg: "Biens de consommation",
      hospitality: "Hôtellerie",
      media: "Médias & Divertissement",
      tech: "Logiciels & Matériel Technologique",
      healthcare: "Soins de santé",
      insurance: "Assurance",
      financial: "Services financiers",
      professional: "Services professionnels",
      education: "Éducation",
      resources: "Ressources",
      blog: "Blog",
      guides: "Guides & eBooks",
      videos: "Vidéos & Webinaires",
      stories: "Histoires de clients",
      gallery: "Galerie d'inspiration de QR Codes",
      developers: "Développeurs",
      apps: "Applications et Intégrations",
      help: "Centre d'aide",
      trust: "Centre de confiance",
      security: "Centre de sécurité",
      browser: "Extension navigateur",
      mobileApp: "Application mobile",
      legal: "Juridique",
      privacy: "Politique de confidentialité",
      cookies: "Politique des cookies",
      terms: "Conditions d'utilisation",
      acceptableUse: "Politique d'utilisation acceptable",
      conduct: "Code de conduite",
      transparency: "Rapport de transparence",
      company: "Entreprise",
      about: "À propos de Bitly",
      careers: "Carrières",
      inclusion: "Inclusion chez Bitly",
      partners: "Partenaires",
      press: "Presse",
      contact: "Contact",
      reviews: "Avis",
      accessibilityReport: "Rapport d'accessibilité",
      accessibilityStatement: "Déclaration d'accessibilité",
      copyright: "© 2026 Bitly | Fabriqué à New York, Berlin et partout dans le monde."
    },
    it: {
      // Navigation
      platform: "Piattaforma",
      solutions: "Soluzioni",
      pricing: "Prezzi",
      resources: "Risorse",
      login: "Accedi",
      getQuote: "Richiedi preventivo",
      signUp: "Iscriviti gratuitamente",

      // Hero Section
      heroTitle: "La Piattaforma di Connessioni Bitly",
      heroDesc: "Tutti i prodotti di cui hai bisogno per creare connessioni di marca, gestire link e codici QR e connetterti con il tuo pubblico ovunque, su un'unica piattaforma unificata.",
      getStarted: "Inizia gratuitamente",

      // URL Shortener Section
      shortenLink: "Accorcia un link lungo",
      noCreditCard: "Nessuna carta di credito richiesta.",
      pasteUrl: "Incolla qui il tuo link lungo",
      yourLink: "Il tuo link accorciato:",
      copy: "Copia",

      // Features Section
      urlShortener: "Accorciatore di URL",
      urlDesc: "Una soluzione completa per rendere ogni punto di connessione tra i tuoi contenuti e il tuo pubblico più potente.",
      learnMore: "Scopri di più",

      // Footer CTA
      footerTitle: "Adottato e amato da milioni di utenti da oltre un decennio",
      startNow: "Inizia ora",

      // Footer
      whyBitly: "Perché Bitly?",
      integrations: "Integrazioni & API",
      enterprise: "Classe Enterprise",
      pricingFooter: "Prezzi",
      products: "Prodotti",
      urlShortenerFooter: "Accorciatore di URL",
      qrCode: "Generatore di QR Code",
      barcodes: "Codici a barre 2D",
      analytics: "Analisi",
      pages: "Pagine",
      features: "Funzionalità",
      linkInBio: "Link nella bio",
      brandedLinks: "Link con branding",
      mobileLinks: "Link mobili",
      utmCampaigns: "Campagne UTM",
      digitalCards: "Biglietti da visita digitali",
      solutions: "Soluzioni",
      retail: "Vendita al dettaglio",
      cpg: "Beni di consumo",
      hospitality: "Ospitalità",
      media: "Media & Intrattenimento",
      tech: "Software & Hardware Tecnologico",
      healthcare: "Assistenza sanitaria",
      insurance: "Assicurazioni",
      financial: "Servizi finanziari",
      professional: "Servizi professionali",
      education: "Istruzione",
      resources: "Risorse",
      blog: "Blog",
      guides: "Guide & eBook",
      videos: "Video & Webinar",
      stories: "Storie dei clienti",
      gallery: "Galleria di ispirazione QR Code",
      developers: "Sviluppatori",
      apps: "App e Integrazioni",
      help: "Centro assistenza",
      trust: "Centro fiducia",
      security: "Centro sicurezza",
      browser: "Estensione browser",
      mobileApp: "App mobile",
      legal: "Aspetti legali",
      privacy: "Informativa sulla privacy",
      cookies: "Policy sui cookie",
      terms: "Termini di servizio",
      acceptableUse: "Policy sull'uso accettabile",
      conduct: "Codice di condotta",
      transparency: "Rapporto sulla trasparenza",
      company: "Azienda",
      about: "Informazioni su Bitly",
      careers: "Carriere",
      inclusion: "Inclusione in Bitly",
      partners: "Partner",
      press: "Stampa",
      contact: "Contatti",
      reviews: "Recensioni",
      accessibilityReport: "Rapporto sull'accessibilità",
      accessibilityStatement: "Dichiarazione sull'accessibilità",
      copyright: "© 2026 Bitly | Realizzato a New York, Berlino e in tutto il mondo."
    },
    pt: {
      // Navigation
      platform: "Plataforma",
      solutions: "Soluções",
      pricing: "Preços",
      resources: "Recursos",
      login: "Entrar",
      getQuote: "Obter cotação",
      signUp: "Inscrever-se gratuitamente",

      // Hero Section
      heroTitle: "A Plataforma de Conexões Bitly",
      heroDesc: "Todos os produtos de que você precisa para criar conexões de marca, gerenciar links e códigos QR e se conectar com seu público em todos os lugares, em uma única plataforma unificada.",
      getStarted: "Começar gratuitamente",

      // URL Shortener Section
      shortenLink: "Encurtar um link longo",
      noCreditCard: "Nenhum cartão de crédito necessário.",
      pasteUrl: "Cole seu link longo aqui",
      yourLink: "Seu link encurtado:",
      copy: "Copiar",

      // Features Section
      urlShortener: "Encurtador de URL",
      urlDesc: "Uma solução abrangente para tornar cada ponto de conexão entre seu conteúdo e seu público mais poderoso.",
      learnMore: "Saiba mais",

      // Footer CTA
      footerTitle: "Adotado e amado por milhões de usuários há mais de uma década",
      startNow: "Começar agora",

      // Footer
      whyBitly: "Por que Bitly?",
      integrations: "Integrações & API",
      enterprise: "Classe Enterprise",
      pricingFooter: "Preços",
      products: "Produtos",
      urlShortenerFooter: "Encurtador de URL",
      qrCode: "Gerador de QR Code",
      barcodes: "Códigos de barras 2D",
      analytics: "Análises",
      pages: "Páginas",
      features: "Recursos",
      linkInBio: "Link na bio",
      brandedLinks: "Links personalizados",
      mobileLinks: "Links móveis",
      utmCampaigns: "Campanhas UTM",
      digitalCards: "Cartões de visita digitais",
      solutions: "Soluções",
      retail: "Varejo",
      cpg: "Bens de consumo",
      hospitality: "Hotelaria",
      media: "Mídia & Entretenimento",
      tech: "Software & Hardware de Tecnologia",
      healthcare: "Saúde",
      insurance: "Seguros",
      financial: "Serviços financeiros",
      professional: "Serviços profissionais",
      education: "Educação",
      resources: "Recursos",
      blog: "Blog",
      guides: "Guias & eBooks",
      videos: "Vídeos & Webinars",
      stories: "Histórias de clientes",
      gallery: "Galeria de inspiração de QR Code",
      developers: "Desenvolvedores",
      apps: "Aplicativos e Integrações",
      help: "Central de ajuda",
      trust: "Central de confiança",
      security: "Central de segurança",
      browser: "Extensão do navegador",
      mobileApp: "Aplicativo móvel",
      legal: "Jurídico",
      privacy: "Política de privacidade",
      cookies: "Política de cookies",
      terms: "Termos de serviço",
      acceptableUse: "Política de uso aceitável",
      conduct: "Código de conduta",
      transparency: "Relatório de transparência",
      company: "Empresa",
      about: "Sobre o Bitly",
      careers: "Carreiras",
      inclusion: "Inclusão no Bitly",
      partners: "Parceiros",
      press: "Imprensa",
      contact: "Contato",
      reviews: "Avaliações",
      accessibilityReport: "Relatório de acessibilidade",
      accessibilityStatement: "Declaração de acessibilidade",
      copyright: "© 2026 Bitly | Feito à mão em Nova York, Berlim e em todo o mundo."
    },
    es: {
      // Navigation
      platform: "Plataforma",
      solutions: "Soluciones",
      pricing: "Precios",
      resources: "Recursos",
      login: "Iniciar sesión",
      getQuote: "Obtener cotización",
      signUp: "Regístrate gratis",

      // Hero Section
      heroTitle: "La Plataforma de Conexiones Bitly",
      heroDesc: "Todos los productos que necesitas para crear conexiones de marca, gestionar enlaces y códigos QR, y conectar con audiencias en todas partes, en una sola plataforma unificada.",
      getStarted: "Comenzar gratis",

      // URL Shortener Section
      shortenLink: "Acortar un enlace largo",
      noCreditCard: "No se requiere tarjeta de crédito.",
      pasteUrl: "Pega tu enlace largo aquí",
      yourLink: "Tu enlace acortado:",
      copy: "Copiar",

      // Features Section
      urlShortener: "Acortador de URL",
      urlDesc: "Una solución integral para hacer que cada punto de conexión entre tu contenido y tu audiencia sea más potente.",
      learnMore: "Aprende más",

      // Footer CTA
      footerTitle: "Adoptado y amado por millones de usuarios durante más de una década",
      startNow: "Empezar ahora",

      // Footer
      whyBitly: "¿Por qué Bitly?",
      integrations: "Integraciones y API",
      enterprise: "Clase Empresarial",
      pricingFooter: "Precios",
      products: "Productos",
      urlShortenerFooter: "Acortador de URL",
      qrCode: "Generador de códigos QR",
      barcodes: "Códigos de barras 2D",
      analytics: "Análisis",
      pages: "Páginas",
      features: "Características",
      linkInBio: "Enlace en biografía",
      brandedLinks: "Enlaces de marca",
      mobileLinks: "Enlaces móviles",
      utmCampaigns: "Campañas UTM",
      digitalCards: "Tarjetas de visita digitales",
      solutions: "Soluciones",
      retail: "Venta minorista",
      cpg: "Bienes de consumo",
      hospitality: "Hostelería",
      media: "Medios y Entretenimiento",
      tech: "Software y Hardware Tecnológico",
      healthcare: "Atención médica",
      insurance: "Seguros",
      financial: "Servicios financieros",
      professional: "Servicios profesionales",
      education: "Educación",
      resources: "Recursos",
      blog: "Blog",
      guides: "Guías y eBooks",
      videos: "Videos y Webinars",
      stories: "Historias de clientes",
      gallery: "Galería de inspiración de códigos QR",
      developers: "Desarrolladores",
      apps: "Aplicaciones e Integraciones",
      help: "Centro de ayuda",
      trust: "Centro de confianza",
      security: "Centro de seguridad",
      browser: "Extensión del navegador",
      mobileApp: "Aplicación móvil",
      legal: "Aspectos legales",
      privacy: "Política de privacidad",
      cookies: "Política de cookies",
      terms: "Términos de servicio",
      acceptableUse: "Política de uso aceptable",
      conduct: "Código de conducta",
      transparency: "Informe de transparencia",
      company: "Empresa",
      about: "Acerca de Bitly",
      careers: "Carreras",
      inclusion: "Inclusión en Bitly",
      partners: "Socios",
      press: "Prensa",
      contact: "Contacto",
      reviews: "Reseñas",
      accessibilityReport: "Informe de accesibilidad",
      accessibilityStatement: "Declaración de accesibilidad",
      copyright: "© 2026 Bitly | Hecho a mano en Nueva York, Berlín y en todo el mundo."
    },
    th: {
      // Navigation
      platform: "แพลตฟอร์ม",
      solutions: "โซลูชัน",
      pricing: "ราคา",
      resources: "ทรัพยากร",
      login: "เข้าสู่ระบบ",
      getQuote: "ขอใบเสนอราคา",
      signUp: "สมัครฟรี",

      // Hero Section
      heroTitle: "แพลตฟอร์มการเชื่อมต่อของ Bitly",
      heroDesc: "ผลิตภัณฑ์ทั้งหมดที่คุณต้องการในการสร้างการเชื่อมต่อแบรนด์ จัดการลิงก์และรหัส QR และเชื่อมต่อกับผู้ชมทุกที่ ในแพลตฟอร์มเดียวที่รวมเป็นหนึ่ง",
      getStarted: "เริ่มต้นฟรี",

      // URL Shortener Section
      shortenLink: "ย่อลิงก์ที่ยาว",
      noCreditCard: "ไม่ต้องใช้บัตรเครดิต",
      pasteUrl: "วางลิงก์ที่ยาวของคุณที่นี่",
      yourLink: "ลิงก์ที่ย่อของคุณ:",
      copy: "คัดลอก",

      // Features Section
      urlShortener: "เครื่องมือย่อลิงก์",
      urlDesc: "โซลูชันที่ครอบคลุมเพื่อช่วยให้ทุกจุดเชื่อมต่อระหว่างเนื้อหาของคุณและผู้ชมของคุณมีประสิทธิภาพมากขึ้น",
      learnMore: "เรียนรู้เพิ่มเติม",

      // Footer CTA
      footerTitle: "ได้รับการยอมรับและเป็นที่ชื่นชอบจากผู้ใช้หลายล้านคนมากกว่าทศวรรษ",
      startNow: "เริ่มต้นตอนนี้",

      // Footer
      whyBitly: "ทำไมต้อง Bitly?",
      integrations: "การรวมระบบ & API",
      enterprise: "ระดับองค์กร",
      pricingFooter: "ราคา",
      products: "ผลิตภัณฑ์",
      urlShortenerFooter: "เครื่องมือย่อลิงก์",
      qrCode: "เครื่องมือสร้างรหัส QR",
      barcodes: "บาร์โค้ด 2 มิติ",
      analytics: "การวิเคราะห์",
      pages: "หน้าเว็บ",
      features: "คุณสมบัติ",
      linkInBio: "ลิงก์ในไบโอ",
      brandedLinks: "ลิงก์แบรนด์",
      mobileLinks: "ลิงก์มือถือ",
      utmCampaigns: "แคมเปญ UTM",
      digitalCards: "บัตรธุรกิจดิจิทัล",
      solutions: "โซลูชัน",
      retail: "ค้าปลีก",
      cpg: "สินค้าบริโภค",
      hospitality: "โรงแรมและการตอบรับ",
      media: "สื่อและบันเทิง",
      tech: "ซอฟต์แวร์และฮาร์ดแวร์เทคโนโลยี",
      healthcare: "การดูแลสุขภาพ",
      insurance: "ประกันภัย",
      financial: "บริการการเงิน",
      professional: "บริการมืออาชีพ",
      education: "การศึกษา",
      resources: "ทรัพยากร",
      blog: "บล็อก",
      guides: "คู่มือและหนังสืออิเล็กทรอนิกส์",
      videos: "วิดีโอและเว็บินาร์",
      stories: "เรื่องราวของลูกค้า",
      gallery: "แกลเลอรีแรงบันดาลใจรหัส QR",
      developers: "นักพัฒนา",
      apps: "แอปพลิเคชันและการรวมระบบ",
      help: "ศูนย์ช่วยเหลือ",
      trust: "ศูนย์ความไว้วางใจ",
      security: "ศูนย์ความปลอดภัย",
      browser: "ส่วนขยายของเบราว์เซอร์",
      mobileApp: "แอปพลิเคชันมือถือ",
      legal: "กฎหมาย",
      privacy: "นโยบายความเป็นส่วนตัว",
      cookies: "นโยบายคุกกี้",
      terms: "ข้อตกลงในการใช้บริการ",
      acceptableUse: "นโยบายการใช้งานที่ยอมรับได้",
      conduct: "รหัสประพฤติปฏิบัติ",
      transparency: "รายงานความโปร่งใส",
      company: "บริษัท",
      about: "เกี่ยวกับ Bitly",
      careers: "อาชีพ",
      inclusion: "การรวมทุกคนใน Bitly",
      partners: "พันธมิตร",
      press: "สื่อมวลชน",
      contact: "ติดต่อเรา",
      reviews: "รีวิว",
      accessibilityReport: "รายงานการเข้าถึง",
      accessibilityStatement: "แถลงการณ์การเข้าถึง",
      copyright: "© 2026 Bitly | สร้างขึ้นที่นครนิวยอร์ก เบอร์ลิน และทั่วโลก"
    }
  };

  const t = translations[language];

  const handleShorten = (e) => {
    e.preventDefault();
    if (!longUrl.trim()) {
      setShowWarning(true);
      setIsShortened(false);
    } else {
      setShowWarning(false);
      setShortUrl(`https://short.ly/${Math.random().toString(36).substring(2, 8)}`);
      setIsShortened(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-orange-500" style={{ fontFamily: "'Pacifico', cursive" }}>
                  Shortly
                </span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-transparent text-gray-300 hover:border-gray-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  {t.platform}
                </a>
                <a href="#" className="border-transparent text-gray-300 hover:border-gray-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  {t.solutions}
                </a>
                <a href="#" className="border-transparent text-gray-300 hover:border-gray-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  {t.pricing}
                </a>
                <a href="#" className="border-transparent text-gray-300 hover:border-gray-300 hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  {t.resources}
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                className="bg-gray-800 border border-gray-700 text-gray-300 px-2 py-1 rounded text-sm"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">🌐 English</option>
                <option value="de">🇩🇪 Deutsch</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="it">🇮🇹 Italiano</option>
                <option value="pt">🇵🇹 Português</option>
                <option value="es">🇪🇸 Español</option>
                <option value="th">🇹🇭 ภาษาไทย</option>
              </select>
              <button
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => navigate('/login')}
              >
                {t.login}
              </button>
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium border border-blue-400 hover:bg-blue-900/20"
              >
                {t.getQuote}
              </a>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                onClick={() => navigate('/signup')}
              >
                {t.signUp}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            {t.heroTitle}
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-300">
            {t.heroDesc}
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <a
              href="#"
              className="inline-block bg-blue-600 py-3 px-6 border border-transparent rounded-md text-base font-medium text-white hover:bg-blue-700"
            >
              {t.getStarted} →
            </a>
            <a
              href="#"
              className="inline-block py-3 px-6 border border-gray-600 rounded-md text-base font-medium text-white hover:bg-gray-800"
            >
              {t.getQuote} →
            </a>
          </div>
        </div>
      </div>

      {/* URL Shortener Section */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-900/20 rounded-2xl shadow-2xl border border-blue-500/30 overflow-hidden transition-all duration-300 hover:shadow-blue-500/30">
            <div className="flex border-b border-blue-500/30">
              <div className="flex">
                <button className="flex items-center px-6 py-4 text-white bg-blue-700/30 border-b-2 border-blue-400 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                  Short Link
                </button>
              </div>
            </div>

            <div className="p-8 bg-blue-50/10 text-gray-900 rounded-b-2xl transition-all duration-300">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.shortenLink}</h2>
              <p className="text-gray-600 mb-8">{t.noCreditCard}</p>

              <form onSubmit={handleShorten} className="space-y-6">
                <div>
                  <label htmlFor="destinationUrl" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.pasteUrl}
                  </label>
                  <input
                    type="url"
                    id="destinationUrl"
                    value={longUrl}
                    onChange={(e) => {
                      setLongUrl(e.target.value);
                      setShowWarning(false);
                    }}
                    placeholder="https://example.com/my-long-url"
                    className={`w-full px-6 py-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${showWarning ? "border-red-500" : "border-blue-300"}`}
                    style={{ minWidth: '500px' }}
                  />
                  {showWarning && (
                    <p className="mt-2 text-sm text-red-600">
                      {t.pasteUrl} (valid URL required)
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center transition-all duration-200 transform hover:scale-[1.01]"
                >
                  {t.getStarted}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </form>

              {isShortened && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{t.yourLink}</p>
                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-medium break-all"
                      >
                        {shortUrl}
                      </a>
                    </div>
                    <button
                      onClick={() => navigator.clipboard.writeText(shortUrl)}
                      className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                      title={t.copy}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
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
              <p className="text-gray-400">
                {t.urlDesc}
              </p>
              <div className="mt-4 flex items-center text-sm text-blue-400">
                {t.learnMore} →
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-6">{t.footerTitle}</h2>
          <button className="bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-orange-600 transition-all duration-200">
            {t.startNow} →
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">{t.whyBitly}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.integrations}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.enterprise}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.pricingFooter}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">{t.products}</h3>
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
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">{t.solutions}</h3>
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
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">{t.resources}</h3>
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
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">{t.legal}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.privacy}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.cookies}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.terms}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.acceptableUse}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.conduct}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">{t.transparency}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">{t.company}</h3>
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
              {/* Social media icons remain unchanged */}
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.417 2.865 8.18 6.839 8.18 2.031 0 2.859-.971 3.485-1.765.601-.773.997-1.675.997-2.906 0-.808-.306-1.49-.773-2.017-.467-.527-1.107-.811-2.17-.811-.837 0-1.628.181-2.54.631C9.13 11.762 8.5 10.521 8.5 9.003c0-1.519.535-2.838 1.53-3.875C11.06 3.695 12.31 2.5 14.607 2.5 16.064 2.5 17.9 4.107 17.9 7.393 0 1.806-.647 3.423-1.707 4.607-1.06 1.182-2.424 1.771-4.155 1.771-1.73 0-3.215-.584-4.45-1.724-.912-.81-.932-2.147-.095-3.345.837-1.198 2.147-1.24 3.982-.584 1.835.64 3.426 1.707 4.607 1.707 1.182.06 2.271-.18 3.215-.584z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 3.723v.08c0 2.316-.012 2.684-.06 3.723-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-3.723.06h-.08c-2.316 0-2.684-.012-3.723-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-2.607 0-1.228.013-1.587.06-2.607.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.404 2.537c.636-.246 1.363-.415 2.427-.465C8.621 2.013 8.965 2 9.685 2h2.63zm-.023 6.977c-1.875 0-3.735.05-5.547.144a2.18 2.18 0 00-1.43.602 42.277 42.277 0 00-1.035 1.082c-.29.31-.43.697-.43 1.148 0 .45.14.838.43 1.147.604.384 1.28 1.057 1.99 2.013.603.85.988 1.648 1.186 2.14.196.492.196.98.196 1.468 0 .488-.196.976-.196 1.468-.196.492 0 .98-.196 1.468-.588.196-.196.384-.488.588-.88.392-.392.588-.88.588-1.468 0-.492-.196-.98-.588-1.468a42.26 42.26 0 00-1.035-1.082 2.178 2.178 0 00-1.43-.602c-1.812-.094-3.672-.144-5.547-.144h-.023a2.18 2.18 0 00-1.43.602 42.275 42.275 0 00-1.035 1.082c-.29.31-.43.697-.43 1.148 0 .45.14.838.43 1.147.604.385 1.28 1.057 1.99 2.013.603.85.988 1.648 1.186 2.14.196.492.196.98.196 1.468 0 .488-.196.976-.196 1.468-.196.492 0 .98-.196 1.468-.588.196-.196.384-.488.588-.88.392-.392.588-.88.588-1.468 0-.492-.196-.98-.588-1.468a42.26 42.26 0 00-1.035-1.082 2.178 2.178 0 00-1.43-.602c-1.812-.094-3.672-.144-5.547-.144z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
