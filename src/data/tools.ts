export interface Tool {
  name: string;
  url: string;
  description: string;
  tags: ('free' | 'paid' | 'cli')[];
}

export interface ToolCategory {
  category: string;
  items: Tool[];
}

export const toolkitRaw: ToolCategory[] = [
  {
    category: "Téléphones",
    items: [
      { name: "TrueCaller", url: "https://truecaller.com/", description: "Identification numéros & spam", tags: ["free"] },
      { name: "Epieos Phone", url: "https://tools.epieos.com/phone.php", description: "Reverse lookup téléphone", tags: ["free"] },
      { name: "PhoneInfoga", url: "https://github.com/sundowndev/PhoneInfoga", description: "Scanner numéros international", tags: ["free", "cli"] },
      { name: "Sync.me", url: "https://sync.me/", description: "Identification appelant inconnu", tags: ["free"] },
      { name: "FreeCarrierLookup", url: "https://freecarrierlookup.com/", description: "Trouver opérateur d'un numéro", tags: ["free"] },
      { name: "WhoCalledMe", url: "https://whocalledme.com/", description: "Reverse téléphone multi-pays", tags: ["free"] },
      { name: "Phunter", url: "https://github.com/megadose/phunter", description: "Info sur numéro de téléphone", tags: ["free", "cli"] },
      { name: "WiGLE", url: "https://wigle.net/", description: "Base données réseaux WiFi/GSM", tags: ["free"] },
      { name: "Bellingcat Phone Number Checker", url: "https://github.com/bellingcat/telegram-phone-number-checker", description: "Vérification de numéros liés à Telegram", tags: ["free", "cli"] },
      { name: "Ignorant", url: "https://github.com/megadose/ignorant", description: "Présence de numéros sur Snapchat / Instagram", tags: ["free", "cli"] },
      { name: "EmobileTracker", url: "https://www.emobiletracker.com", description: "Recherche et identification d'informations sur des mobiles", tags: ["free"] },
      { name: "Vedbex", url: "https://vedbex.com", description: "Outil de pivot pour lier un numéro de téléphone à un compte Skype", tags: ["free"] },
      { name: "That's Them", url: "https://thatsthem.com/", description: "Recherche personnes et téléphones", tags: ["free"] },
      { name: "ZabaSearch", url: "https://www.zabasearch.com/", description: "Recherche publique de personnes", tags: ["free"] }
    ]
  },
  {
    category: "Emails",
    items: [
      { name: "Epieos Email", url: "https://tools.epieos.com/email.php", description: "Reverse email — comptes liés", tags: ["free"] },
      { name: "VerifyEmailAddress", url: "https://www.verifyemailaddress.org/", description: "Vérifier si email existe", tags: ["free"] },
      { name: "HaveIBeenPwned", url: "https://haveibeenpwned.com/", description: "Présence dans des fuites", tags: ["free"] },
      { name: "Holehe", url: "https://github.com/megadose/holehe", description: "Présence email sur services", tags: ["free", "cli"] },
      { name: "Hunter", url: "https://hunter.io/", description: "Recherche d'emails liés à un domaine", tags: ["free", "paid"] },
      { name: "EmailRep", url: "https://emailrep.io/", description: "Réputation d'une adresse email", tags: ["free"] },
      { name: "GHunt", url: "https://github.com/mxrch/GHunt", description: "Recherche sur comptes Google publics", tags: ["free", "cli"] },
      { name: "Mailcat", url: "https://github.com/sharsil/mailcat", description: "Trouver emails via pseudo", tags: ["free", "cli"] },
      { name: "Sherlockeye", url: "https://sherlockeye.io", description: "Investigation d'adresses e-mail pour découvrir les comptes liés", tags: ["free"] },
      { name: "BreachDirectory", url: "https://breachdirectory.org/", description: "Recherche dans fuites", tags: ["free"] },
      { name: "ScamSearch", url: "https://scamsearch.io/", description: "Base de données arnaqueurs", tags: ["free"] },
      { name: "Skymem", url: "https://www.skymem.info/", description: "Trouver emails d'entreprises", tags: ["free"] },
      { name: "Whoxy", url: "https://www.whoxy.com/", description: "Domaine WHOIS et historiques email", tags: ["free", "paid"] },
      { name: "SimpleLogin", url: "https://simplelogin.io/", description: "Masquer une adresse email", tags: ["free"] },
      { name: "Email-Format", url: "http://email-format.com/", description: "Formats emails d'entreprises", tags: ["free"] },
      { name: "Apollo", url: "https://www.apollo.io/", description: "Prospection contacts pro et emails", tags: ["free", "paid"] },
      { name: "Snov.io", url: "https://snov.io/email-finder", description: "Recherche et verification d'emails", tags: ["free", "paid"] },
      { name: "HaveIBeenZuckered", url: "https://www.haveibeenzuckered.com/", description: "Recherche dans fuites Facebook", tags: ["free"] }
    ]
  },
  {
    category: "Usernames",
    items: [
      { name: "Sherlock", url: "https://github.com/sherlock-project/sherlock", description: "Recherche de pseudo multi-sites", tags: ["free", "cli"] },
      { name: "Maigret", url: "https://github.com/soxoj/maigret", description: "Découverte de comptes liés", tags: ["free", "cli"] },
      { name: "WhatsMyName", url: "https://whatsmyname.app/", description: "Vérifier présence d'un username", tags: ["free"] },
      { name: "Blackbird", url: "https://github.com/p1ngul1n0/blackbird", description: "Traque et recherche de pseudonymes sur plus de 500 plateformes", tags: ["free", "cli"] },
      { name: "osint.rocks", url: "https://osint.rocks/", description: "Interface et toolkit léger pour l'investigation de pseudos", tags: ["free"] },
      { name: "NameCheckup", url: "https://namecheckup.com/", description: "Recherche pseudo & disponibilité", tags: ["free"] },
      { name: "IDCrawl", url: "https://www.idcrawl.com/username", description: "Agrégation d'identité publique", tags: ["free"] },
      { name: "AnalyzeID", url: "https://analyzeid.com/", description: "Analyse de pseudonymes et identités", tags: ["free"] },
      { name: "PeekYou", url: "https://www.peekyou.com/", description: "Recherche de profils publics", tags: ["free"] },
      { name: "User Searcher", url: "https://www.user-searcher.com/", description: "Présence de pseudos sur plateformes", tags: ["free"] },
      { name: "Namechk", url: "https://namechk.com/", description: "Disponibilité de noms utilisateurs", tags: ["free"] }
    ]
  },
  {
    category: "Domaines & DNS",
    items: [
      { name: "crt.sh", url: "https://crt.sh/", description: "Certificats & sous-domaines", tags: ["free"] },
      { name: "DNSDumpster", url: "https://dnsdumpster.com/", description: "Cartographie DNS", tags: ["free"] },
      { name: "SecurityTrails", url: "https://securitytrails.com/dns-trails", description: "Historique DNS & sous-domaines", tags: ["free", "paid"] },
      { name: "Who.is", url: "https://who.is/", description: "WHOIS domaine", tags: ["free"] },
      { name: "URLScan", url: "https://urlscan.io/", description: "Analyse d'URL et ressources", tags: ["free"] },
      { name: "Shodan", url: "https://www.shodan.io/", description: "Services exposés et bannières", tags: ["free", "paid"] },
      { name: "Censys", url: "https://search.censys.io/", description: "Recherche d'hôtes et certificats", tags: ["free"] },
      { name: "dnstwist", url: "https://github.com/elceef/dnstwist", description: "Analyse et détection de domaines de phishing ou typosquatting", tags: ["free", "cli"] },
      { name: "Subdomain Finder", url: "https://github.com/aboul3la/Sublist3r", description: "Recherche de sous-domaines via moteurs et sources publiques", tags: ["free", "cli"] },
      { name: "BuiltWith", url: "http://builtwith.com/", description: "Technologies utilisées par un site", tags: ["free"] },
      { name: "Robtex", url: "https://www.robtex.com/", description: "Vue DNS et réseau", tags: ["free"] },
      { name: "MXToolbox", url: "https://mxtoolbox.com/", description: "Diagnostics DNS, MX et email", tags: ["free"] },
      { name: "DomainDossier", url: "http://centralops.net/co/DomainDossier.aspx", description: "WHOIS, DNS et routes", tags: ["free"] },
      { name: "CentralOps", url: "http://centralops.net/", description: "Outils réseau et domaine", tags: ["free"] },
      { name: "ICANN Lookup", url: "https://lookup.icann.org/en/lookup", description: "WHOIS via ICANN", tags: ["free"] },
      { name: "BGPView", url: "https://bgpview.io/", description: "ASN et routage BGP", tags: ["free"] },
      { name: "BGP.Tools", url: "https://bgp.tools/", description: "Exploration BGP avancée", tags: ["free"] },
      { name: "SubdomainRadar", url: "https://subdomainradar.io/", description: "Découverte de sous-domaines", tags: ["free", "paid"] },
      { name: "FullHunt", url: "https://fullhunt.io/", description: "Découverte surface d'attaque", tags: ["free", "paid"] },
      { name: "BeVigil", url: "https://bevigil.com/search", description: "Assets mobiles, domaines et fuites", tags: ["free"] },
      { name: "Netlas", url: "https://raw.netlas.io/", description: "Indexation de services exposés", tags: ["free"] },
      { name: "FOFA", url: "https://en.fofa.info/", description: "Moteur de recherche d'actifs Internet", tags: ["free", "paid"] },
      { name: "Criminal IP", url: "https://www.criminalip.io/", description: "Recherche d'IP et services", tags: ["free", "paid"] },
      { name: "Web Check", url: "https://web-check.as93.net/", description: "Analyse d'un site web complète", tags: ["free"] },
      { name: "NerdyData", url: "https://nerdydata.com/", description: "Recherche dans le code source web", tags: ["free", "paid"] },
      { name: "PublicWWW", url: "https://publicwww.com/", description: "Recherche de technologies web", tags: ["free"] },
      { name: "DNSViz", url: "http://dnsviz.net/", description: "Visualisation et analyse DNSSEC", tags: ["free"] },
      { name: "DNSSEC Debugger", url: "http://dnssec-debugger.verisignlabs.com/", description: "Débogage DNSSEC", tags: ["free"] },
      { name: "Validin", url: "https://app.validin.com/", description: "Intelligence DNS et pivots", tags: ["free", "paid"] },
      { name: "Whois ARIN", url: "https://whois.arin.net/", description: "WHOIS IP et opérateurs", tags: ["free"] },
      { name: "Radar Cloudflare", url: "https://radar.cloudflare.com/", description: "Tendances Internet et ASN", tags: ["free"] }
    ]
  },
  {
    category: "Breaches & Leaks",
    items: [
      { name: "DeHashed", url: "https://dehashed.com/", description: "Recherche dans fuites de données", tags: ["paid"] },
      { name: "LeakCheck", url: "https://leakcheck.io/", description: "Vérification emails et fuites", tags: ["free", "paid"] },
      { name: "IntelX Tools", url: "https://intelx.io/tools", description: "Recherche multi-sources et traces", tags: ["free", "paid"] },
      { name: "Doxbin", url: "https://doxbin.net/", description: "Agrégation de leaks publics", tags: ["free"] },
      { name: "JustPaste.it", url: "https://justpaste.it/", description: "Recherche de pastes publics", tags: ["free"] },
      { name: "Pastebin.pl", url: "https://pastebin.pl/", description: "Pastes texte publics", tags: ["free"] },
      { name: "Tor.link Paste", url: "https://tor.link/paste/new", description: "Service de paste sur Tor", tags: ["free"] },
      { name: "OSINT.rocks", url: "https://osint.rocks/", description: "Ressources et liens OSINT", tags: ["free"] },
      { name: "Dark Web Informer", url: "https://darkwebinformer.com/threat-actor-database/", description: "Base d'acteurs et veille dark web", tags: ["free"] },
      { name: "Threat Actor Database", url: "https://malpedia.caad.fkie.fraunhofer.de/actors", description: "Acteurs malveillants répertoriés", tags: ["free"] },
      { name: "GrayHatWarfare", url: "https://grayhatwarfare.com/", description: "Recherche fichiers exposés", tags: ["free", "paid"] }
    ]
  },
  {
    category: "Métadonnées",
    items: [
      { name: "Exif.regex.info", url: "http://exif.regex.info/", description: "Lire EXIF d'images", tags: ["free"] },
      { name: "Jimpl", url: "https://jimpl.com/", description: "Extraction métadonnées image", tags: ["free"] },
      { name: "FOCA", url: "https://github.com/ElevenPaths/FOCA", description: "Métadonnées de documents", tags: ["free"] },
      { name: "Pic2Map", url: "https://www.pic2map.com/", description: "GPS dans les photos", tags: ["free"] },
      { name: "Exif Editor", url: "https://exifeditor.io/", description: "Voir et modifier EXIF", tags: ["free"] },
      { name: "MattW YouTube Metadata", url: "https://mattw.io/youtube-metadata/", description: "Métadonnées YouTube", tags: ["free"] },
      { name: "Photo Forensics", url: "https://29a.ch/photo-forensics/", description: "Détection de manipulation d'image", tags: ["free"] }
    ]
  },
  {
    category: "Moteurs de recherche",
    items: [
      { name: "Google", url: "https://www.google.com/", description: "Recherche web générale", tags: ["free"] },
      { name: "Bing", url: "https://www.bing.com/", description: "Alternative utile pour pivots", tags: ["free"] },
      { name: "Yandex", url: "https://yandex.com/", description: "Recherche web & image", tags: ["free"] },
      { name: "DuckDuckGo", url: "https://duckduckgo.com/", description: "Recherche plus discrète", tags: ["free"] },
      { name: "Yahoo", url: "https://www.yahoo.com/", description: "Recherche web alternative", tags: ["free"] },
      { name: "Mojeek", url: "https://www.mojeek.com/", description: "Moteur indépendant", tags: ["free"] },
      { name: "Kagi", url: "https://kagi.com/", description: "Moteur premium et filtrage avancé", tags: ["paid"] },
      { name: "Swisscows", url: "https://swisscows.com/", description: "Moteur orienté confidentialité", tags: ["free"] },
      { name: "Millionshort", url: "https://millionshort.com/", description: "Retire les top résultats pour trouver autre chose", tags: ["free"] },
      { name: "Google Hacking DB", url: "https://www.exploit-db.com/google-hacking-database", description: "Google dorks", tags: ["free"] },
      { name: "DorkGenius", url: "https://dorkgenius.com/", description: "Générateur de dorks", tags: ["free"] },
      { name: "DorkGPT", url: "https://www.dorkgpt.com/", description: "Aide IA pour dorks", tags: ["free"] },
      { name: "Google Dorks for Bug Bounty", url: "https://github.com/sushil79/Google-Dorks-for-Bug-Bounty", description: "Compilation de dorks préconfigurés pour la recherche de failles", tags: ["free"] },
      { name: "Google Trends", url: "https://www.google.com/trends", description: "Tendances de recherche", tags: ["free"] },
      { name: "Google News", url: "https://news.google.com/", description: "Recherche d'actualité", tags: ["free"] },
      { name: "Scholar Google", url: "https://scholar.google.com/", description: "Recherche académique", tags: ["free"] },
      { name: "Biznar", url: "http://biznar.com/", description: "Recherche business et économique", tags: ["free"] },
      { name: "Boardreader", url: "http://boardreader.com/", description: "Forums et discussions", tags: ["free"] },
      { name: "Carrot2", url: "https://search.carrot2.org/", description: "Clustering de résultats web", tags: ["free"] },
      { name: "2lingual", url: "http://2lingual.com/", description: "Recherche bilingue Google", tags: ["free"] },
      { name: "IsearchFrom", url: "https://isearchfrom.com/", description: "Simuler recherche depuis un pays", tags: ["free"] },
      { name: "Qwant", url: "https://www.qwant.com/", description: "Moteur européen", tags: ["free"] },
      { name: "Brave Search", url: "https://search.brave.com/", description: "Recherche privée Brave", tags: ["free"] },
      { name: "AOL", url: "https://search.aol.com/", description: "Recherche alternative", tags: ["free"] },
      { name: "Ask", url: "https://www.ask.com/", description: "Moteur de recherche historique", tags: ["free"] },
      { name: "Baidu", url: "https://www.baidu.com/", description: "Moteur chinois", tags: ["free"] },
      { name: "Colossus", url: "https://search.colossus.com/", description: "People search et enquête", tags: ["free"] },
      { name: "Newspaper Archive", url: "https://newspaperarchive.com/", description: "Presse et archives historiques", tags: ["paid"] },
      { name: "Internet Archive", url: "https://archive.org/", description: "Archives, livres et médias", tags: ["free"] },
      { name: "Academic Microsoft", url: "http://academic.research.microsoft.com/", description: "Recherche académique historique", tags: ["free"] },
      { name: "Academia", url: "http://academia.edu/", description: "Documents et recherche", tags: ["free"] },
      { name: "CiteseerX", url: "http://citeseer.ist.psu.edu/", description: "Articles académiques", tags: ["free"] },
      { name: "Global Factiva", url: "https://global.factiva.com/", description: "Presse et information professionnelle", tags: ["paid"] },
      { name: "THW", url: "https://thehiddenwiki.org/", description: "Répertoire dark web", tags: ["free"] },
      { name: "Ahmia", url: "https://ahmia.fi/", description: "Recherche dark web Tor", tags: ["free"] }
    ]
  },
  {
    category: "Images inversées",
    items: [
      { name: "Google Lens", url: "https://lens.google.com/", description: "Recherche visuelle", tags: ["free"] },
      { name: "TinEye", url: "https://tineye.com/", description: "Recherche d'images similaires", tags: ["free"] },
      { name: "ImgOps", url: "https://imgops.com/", description: "Hub d'analyse d'images", tags: ["free"] },
      { name: "FaceCheck", url: "https://facecheck.id/", description: "Recherche faciale web", tags: ["paid"] },
      { name: "PimEyes", url: "https://pimeyes.com/", description: "Recherche faciale avancée", tags: ["paid"] },
      { name: "Search4Faces", url: "https://search4faces.com/", description: "Recherche faciale sur réseaux", tags: ["free"] },
      { name: "ImageRaider", url: "https://www.imageraider.com/", description: "Suivi d'images réutilisées", tags: ["free"] },
      { name: "Images Google", url: "https://images.google.com/", description: "Recherche d'images classique", tags: ["free"] },
      { name: "RevEye", url: "https://chromewebstore.google.com/", description: "Extension reverse image", tags: ["free"] },
      { name: "Mapillary", url: "https://www.mapillary.com/app/", description: "Imagerie street-level", tags: ["free"] },
      { name: "Filmot", url: "https://filmot.com/", description: "Recherche dans sous-titres YouTube", tags: ["free"] }
    ]
  },
  {
    category: "Réseaux sociaux",
    items: [
      { name: "Social Searcher", url: "https://www.social-searcher.com/", description: "Recherche social media", tags: ["free"] },
      { name: "Foller.me", url: "https://foller.me/", description: "Analyse compte X/Twitter", tags: ["free"] },
      { name: "InVID", url: "https://www.invid-project.eu/tools-and-services/invid-verification-plugin/", description: "Vérification vidéo & images", tags: ["free"] },
      { name: "Bellingcat Toolkit", url: "http://bit.ly/bcattools", description: "Outils de vérification", tags: ["free"] },
      { name: "Instaloader", url: "https://github.com/instaloader/instaloader", description: "Outil CLI puissant pour extraire et sauvegarder les profils Instagram", tags: ["free", "cli"] },
      { name: "LinkedIn Overlay Remover", url: "https://github.com/jfilter/linkedin-overlay-remover", description: "Script pour contourner le mur de connexion obligatoire de LinkedIn", tags: ["free", "cli"] },
      { name: "Bellingcat Insta Location", url: "https://bellingcat.github.io/instagram-location-search/", description: "Interface de recherche de posts Instagram par zone géographique", tags: ["free"] },
      { name: "Twitter", url: "https://twitter.com/", description: "Plateforme X/Twitter", tags: ["free"] },
      { name: "Instagram", url: "https://www.instagram.com/", description: "Plateforme Instagram", tags: ["free"] },
      { name: "Facebook", url: "https://www.facebook.com/", description: "Plateforme Facebook", tags: ["free"] },
      { name: "LinkedIn", url: "https://www.linkedin.com/", description: "Profils et entreprises", tags: ["free"] },
      { name: "Bluesky", url: "https://bsky.app/", description: "Réseau social ouvert", tags: ["free"] },
      { name: "Threads", url: "https://www.threads.net/", description: "Réseau social Threads", tags: ["free"] },
      { name: "VK", url: "https://vk.com/", description: "Réseau social VK", tags: ["free"] },
      { name: "Tumblr", url: "https://www.tumblr.com/", description: "Blogs et posts", tags: ["free"] },
      { name: "Reddit", url: "https://www.reddit.com/", description: "Forums communautaires", tags: ["free"] },
      { name: "Reddit Comment Search", url: "https://redditcommentsearch.com/", description: "Recherche dans commentaires Reddit", tags: ["free"] },
      { name: "Iconosquare", url: "http://iconosquare.com/", description: "Analyse Instagram", tags: ["paid"] },
      { name: "Hootsuite", url: "http://hootsuite.com/", description: "Planification et veille social media", tags: ["paid"] },
      { name: "BuzzSumo", url: "http://buzzsumo.com/", description: "Contenus et influenceurs", tags: ["paid"] },
      { name: "Brandwatch", url: "https://www.brandwatch.com/", description: "Social listening", tags: ["paid"] },
      { name: "TwitterAudit", url: "https://www.twitteraudit.com/", description: "Audit audience X/Twitter", tags: ["free"] },
      { name: "AnalyzeID", url: "https://analyzeid.com/", description: "Analyse comptes sociaux", tags: ["free"] }
    ]
  },
  {
    category: "Géolocalisation",
    items: [
      { name: "Google Maps", url: "https://www.google.com/maps", description: "Cartographie & repérage", tags: ["free"] },
      { name: "Google Earth", url: "https://earth.google.com/", description: "Vue satellite & 3D", tags: ["free"] },
      { name: "GeoHints", url: "https://geohints.com/", description: "Indices géolocalisation", tags: ["free"] },
      { name: "OpenStreetMap", url: "https://www.openstreetmap.org/", description: "Carte collaborative", tags: ["free"] },
      { name: "Sentinel Hub Playground", url: "https://apps.sentinel-hub.com/sentinel-playground/", description: "Visualisation d'imageries satellites récentes sous divers spectres", tags: ["free"] },
      { name: "GPSJam", url: "https://gpsjam.org/", description: "Analyse cartographique des interférences GPS globales en temps réel", tags: ["free"] },
      { name: "MapChecking", url: "https://www.mapchecking.com/", description: "Estimation de la taille et densité d'une foule sur une zone fixe", tags: ["free"] },
      { name: "Live Starlink Satellite Tracker", url: "https://findstarlink.com/", description: "Suivi visuel et cartographique de la constellation Starlink", tags: ["free"] },
      { name: "BatchGeo", url: "http://batchgeo.com/", description: "Cartographie de listes d'adresses", tags: ["free"] },
      { name: "Google Earth Explorer", url: "https://earthexplorer.usgs.gov/", description: "Imagerie satellite USGS", tags: ["free"] },
      { name: "Satellites.pro", url: "https://satellites.pro/", description: "Imagerie satellite et altitude", tags: ["free"] },
      { name: "OpenTopoMap", url: "https://opentopomap.org/", description: "Cartes topographiques", tags: ["free"] },
      { name: "MapChart", url: "https://mapchart.net/", description: "Cartes thématiques simples", tags: ["free"] },
      { name: "Mapbox", url: "https://www.mapbox.com/", description: "Cartes interactives", tags: ["free", "paid"] },
      { name: "Zoom Earth", url: "https://zoom.earth/", description: "Météo et images satellite temps réel", tags: ["free"] },
      { name: "Windy", url: "https://www.windy.com/", description: "Vent, météo et cartes", tags: ["free"] },
      { name: "SunCalc", url: "https://www.suncalc.org/", description: "Position du soleil et ombres", tags: ["free"] },
      { name: "DailyEarth", url: "http://dailyearth.com/", description: "Infos géospatiales et cartes", tags: ["free"] },
      { name: "IP2Geolocation", url: "https://ip2geolocation.com/", description: "Géolocalisation IP", tags: ["free"] },
      { name: "DB-IP", url: "https://db-ip.com/", description: "IP et géolocalisation", tags: ["free"] },
      { name: "Dedigger", url: "https://www.dedigger.com/", description: "Recherche de coordonnées GPS", tags: ["free"] },
      { name: "GeoGig", url: "http://geogig.org/", description: "Versioning géospatial", tags: ["free"] },
      { name: "EarthExplorer USGS", url: "https://earthexplorer.usgs.gov/", description: "Archives satellites", tags: ["free"] },
      { name: "Inspire Geoportal", url: "http://inspire-geoportal.ec.europa.eu/", description: "Données géographiques UE", tags: ["free"] },
      { name: "Zeemaps", url: "https://www.zeemaps.com/", description: "Créer cartes personnalisées", tags: ["free"] }
    ]
  },
  {
    category: "Archives web",
    items: [
      { name: "Wayback Machine", url: "https://web.archive.org/", description: "Archives web depuis 1996", tags: ["free"] },
      { name: "Archive.ph", url: "https://archive.ph/", description: "Captures instantanées", tags: ["free"] },
      { name: "CachedView", url: "https://cachedview.com/", description: "Pages en cache", tags: ["free"] },
      { name: "OldWeb.today", url: "https://oldweb.today/", description: "Navigateur web ancien", tags: ["free"] },
      { name: "Common Crawl", url: "https://commoncrawl.org/", description: "Corpus web massif", tags: ["free"] },
      { name: "Archive.org", url: "https://archive.org/", description: "Archives internet et médias", tags: ["free"] },
      { name: "National Archives UK", url: "https://www.nationalarchives.gov.uk/", description: "Archives nationales britanniques", tags: ["free"] },
      { name: "DocumentCloud", url: "https://www.documentcloud.org/", description: "Recherche et annotation de documents", tags: ["free"] },
      { name: "Archive.is", url: "http://archive.is/", description: "Archive et snapshots web", tags: ["free"] }
    ]
  },
  {
    category: "Entreprises",
    items: [
      { name: "OpenCorporates", url: "https://opencorporates.com/", description: "Registres d'entreprises", tags: ["free"] },
      { name: "OCCRP Aleph", url: "https://aleph.occrp.org/", description: "Recherche documents et entités", tags: ["free"] },
      { name: "Offshore Leaks", url: "https://offshoreleaks.icij.org/", description: "Structures offshore", tags: ["free"] },
      { name: "Crunchbase", url: "https://www.crunchbase.com/", description: "Entreprises & startups", tags: ["free", "paid"] },
      { name: "OpenSanctions", url: "https://www.opensanctions.org/search/", description: "Sanctions et entités", tags: ["free"] },
      { name: "OpenOwnership", url: "https://register.openownership.org/", description: "Bénéficiaires effectifs", tags: ["free"] },
      { name: "Corporation Wiki", url: "https://www.corporationwiki.com/", description: "Entreprises et dirigeants", tags: ["free"] },
      { name: "Companies House", url: "https://www.gov.uk/government/organisations/companies-house", description: "Registre UK", tags: ["free"] },
      { name: "Comparably", url: "https://www.comparably.com/", description: "Infos culture et salaires entreprises", tags: ["free"] },
      { name: "Glassdoor", url: "https://www.glassdoor.com/", description: "Avis d'employés", tags: ["free"] },
      { name: "The Org", url: "https://theorg.com/", description: "Organigrammes d'entreprises", tags: ["free"] },
      { name: "NorthData", url: "https://www.northdata.com/", description: "Données entreprises", tags: ["free", "paid"] },
      { name: "YouControl", url: "https://youcontrol.com.ua/en/", description: "Entreprise et due diligence", tags: ["free", "paid"] },
      { name: "GlobalEdge", url: "http://globaledge.msu.edu/", description: "Ressources business et pays", tags: ["free"] },
      { name: "DIBS GlobalEdge", url: "http://globaledge.msu.edu/tools-and-data/dibs", description: "Données business internationales", tags: ["free"] },
      { name: "LittleSis", url: "https://littlesis.org/", description: "Pouvoir, influence et liens", tags: ["free"] },
      { name: "Xing", url: "https://www.xing.com/", description: "Profils pro Europe", tags: ["free"] }
    ]
  },
  {
    category: "Code & Repositories",
    items: [
      { name: "GitHub", url: "https://github.com/", description: "Code, profils et dépôts", tags: ["free"] },
      { name: "GitHub Advanced Search", url: "https://github.com/search/advanced", description: "Recherche GitHub avancée", tags: ["free"] },
      { name: "Grep.app", url: "https://grep.app/", description: "Recherche dans code open source", tags: ["free"] },
      { name: "SearchCode", url: "https://searchcode.com/", description: "Recherche d'extraits de code", tags: ["free"] },
      { name: "grep.app", url: "https://grep.app", description: "Moteur d'indexation pour fouiller du texte au sein de dépôts publics", tags: ["free"] },
      { name: "searchcode", url: "https://searchcode.com", description: "Analyse et recherche avancée de fonctions ou tokens dans le code source", tags: ["free"] },
      { name: "Sourcegraph", url: "https://sourcegraph.com/search", description: "Navigation de code universelle", tags: ["free"] },
      { name: "GitLab", url: "https://gitlab.com/explore", description: "Dépôts GitLab publics", tags: ["free"] },
      { name: "Gist", url: "https://gist.github.com/", description: "Snippets publics GitHub", tags: ["free"] },
      { name: "Codefinder", url: "http://codefinder.org/", description: "Recherche dans code", tags: ["free"] },
      { name: "Photon", url: "https://github.com/s0md3v/Photon", description: "Crawler web pour OSINT", tags: ["free", "cli"] },
      { name: "SpiderFoot", url: "https://github.com/smicallef/spiderfoot", description: "Automatisation OSINT", tags: ["free", "cli"] },
      { name: "theHarvester", url: "https://github.com/laramies/theHarvester", description: "Emails, sous-domaines et noms", tags: ["free", "cli"] },
      { name: "Amass", url: "https://github.com/owasp-amass/amass", description: "Énumération infrastructure", tags: ["free", "cli"] },
      { name: "SpiderFoot site", url: "https://www.spiderfoot.net/", description: "Plateforme SpiderFoot", tags: ["free"] },
      { name: "Maltego", url: "https://www.maltego.com/", description: "Graphes et pivots d'enquête", tags: ["free", "paid"] },
      { name: "Graphystories", url: "http://app.graphystories.com/", description: "Visualisation de graphes", tags: ["free"] },
      { name: "Palladio", url: "http://hdlab.stanford.edu/palladio", description: "Visualisation de données", tags: ["free"] }
    ]
  },
  {
    category: "Transport & Véhicules",
    items: [
      { name: "FlightRadar24", url: "https://www.flightradar24.com/", description: "Suivi de vols en temps réel", tags: ["free", "paid"] },
      { name: "FlightAware", url: "https://www.flightaware.com/", description: "Trafic aérien et historique", tags: ["free"] },
      { name: "MarineTraffic", url: "https://www.marinetraffic.com/", description: "Suivi de navires AIS", tags: ["free", "paid"] },
      { name: "VesselFinder", url: "https://www.vesselfinder.com/", description: "Suivi de navires", tags: ["free"] },
      { name: "OpenSky Network", url: "https://opensky-network.org/", description: "ADS-B open source", tags: ["free"] },
      { name: "ADSB Exchange", url: "https://globe.adsbexchange.com/", description: "Trafic aérien non filtré", tags: ["free"] },
      { name: "FaxVIN", url: "https://www.faxvin.com/", description: "Vérification VIN", tags: ["free"] }
    ]
  },
  {
    category: "Monitoring & Threat Intel",
    items: [
      { name: "Visualping", url: "https://visualping.io/", description: "Alerte changements de pages", tags: ["free", "paid"] },
      { name: "FetchRSS", url: "http://fetchrss.com/", description: "Créer flux RSS sur pages", tags: ["free"] },
      { name: "Ctrlq RSS", url: "http://ctrlq.org/rss", description: "Générateur de flux", tags: ["free"] },
      { name: "Feed Exileed", url: "http://feed.exileed.com/", description: "Agrégation RSS", tags: ["free"] },
      { name: "Feed Janicek", url: "http://feed.janicek.co/", description: "Veille RSS", tags: ["free"] },
      { name: "Pulsedive", url: "https://pulsedive.com/", description: "Threat intelligence et IOCs", tags: ["free"] },
      { name: "GreyNoise", url: "https://greynoise.io/", description: "Bruit Internet et scanners", tags: ["free", "paid"] },
      { name: "GreyNoise Viz", url: "https://viz.greynoise.io/", description: "Visualisation GreyNoise", tags: ["free"] },
      { name: "AbuseIPDB", url: "https://www.abuseipdb.com/", description: "Réputation d'adresses IP", tags: ["free"] },
      { name: "Talos Reputation", url: "https://talosintelligence.com/reputation_center", description: "Réputation domaines/IPs", tags: ["free"] },
      { name: "OTX AlienVault", url: "https://otx.alienvault.com/", description: "Threat intel communautaire", tags: ["free"] },
      { name: "URLHaus", url: "https://urlhaus.abuse.ch/", description: "URLs malveillantes", tags: ["free"] },
      { name: "Bazaar", url: "https://bazaar.abuse.ch/browse/", description: "Samples malware", tags: ["free"] },
      { name: "YARAify", url: "https://yaraify.abuse.ch/", description: "Recherche YARA et malware", tags: ["free"] },
      { name: "Hybrid Analysis", url: "https://www.hybrid-analysis.com/", description: "Sandbox malware", tags: ["free"] },
      { name: "MetaDefender", url: "https://metadefender.com/", description: "Scan de fichiers et réputation", tags: ["free"] },
      { name: "Malpedia Actors", url: "https://malpedia.caad.fkie.fraunhofer.de/actors", description: "Base acteurs malware", tags: ["free"] },
      { name: "LiveUAmap", url: "https://liveuamap.com/", description: "Carte événements et conflits", tags: ["free"] },
      { name: "Imperva Attack Map", url: "https://www.imperva.com/cyber-threat-attack-map/", description: "Carte d'attaques cyber", tags: ["free"] },
      { name: "ThreatMap", url: "https://threatmap.checkpoint.com/", description: "Carte cyber mondiale", tags: ["free"] }
    ]
  },
  {
    category: "Documents & Data",
    items: [
      { name: "DocumentCloud", url: "https://www.documentcloud.org/", description: "Explorer et annoter des documents", tags: ["free"] },
      { name: "FilePursuit", url: "https://filepursuit.com/", description: "Recherche de fichiers publics", tags: ["free"] },
      { name: "Data UN", url: "http://data.un.org/", description: "Données ONU", tags: ["free"] },
      { name: "World Bank Data", url: "http://data.worldbank.org/", description: "Données Banque mondiale", tags: ["free"] },
      { name: "AidData", url: "http://aiddata.org/", description: "Données aide et développement", tags: ["free"] },
      { name: "Comtrade", url: "http://comtrade.un.org/", description: "Commerce international", tags: ["free"] },
      { name: "Eurostat", url: "http://ec.europa.eu/eurostat", description: "Statistiques UE", tags: ["free"] },
      { name: "CIA World Factbook", url: "https://www.cia.gov/the-world-factbook/", description: "Profils pays", tags: ["free"] },
      { name: "Judy Records", url: "https://www.judyrecords.com/", description: "Archives de dossiers judiciaires", tags: ["free"] },
      { name: "CourtListener", url: "https://www.courtlistener.com/recap/", description: "Jurisprudence et décisions", tags: ["free"] },
      { name: "UniCourt", url: "https://unicourt.com/", description: "Dossiers judiciaires", tags: ["free", "paid"] },
      { name: "VoterRecords", url: "https://voterrecords.com/", description: "Données électorales publiques US", tags: ["free"] },
      { name: "FamilySearch", url: "https://familysearch.org/", description: "Généalogie et archives", tags: ["free"] },
      { name: "FamilyTreeNow", url: "https://familytreenow.com/", description: "Recherche familiale et adresses", tags: ["free"] },
      { name: "Academia", url: "http://academia.edu/", description: "Documents académiques", tags: ["free"] },
      { name: "Wiley", url: "http://eu.wiley.com/", description: "Publications scientifiques", tags: ["paid"] },
      { name: "JournalSeek", url: "http://journalseek.net/", description: "Répertoire de revues", tags: ["free"] }
    ]
  },
  {
    category: "Visualisation & DataViz",
    items: [
      { name: "Datawrapper", url: "https://datawrapper.de/", description: "Graphiques et cartes", tags: ["free"] },
      { name: "Canva", url: "https://www.canva.com/", description: "Visuels et présentations", tags: ["free"] },
      { name: "Create.ly", url: "http://creately.com/", description: "Diagrammes et organigrammes", tags: ["free"] },
      { name: "ColorBrewer", url: "http://colorbrewer2.org/", description: "Palettes pour cartes", tags: ["free"] },
      { name: "Circos", url: "http://circos.ca/", description: "Graphiques circulaires complexes", tags: ["free"] },
      { name: "D3.js", url: "https://d3js.org/", description: "Visualisation de données avancée", tags: ["free", "cli"] },
      { name: "Dygraphs", url: "http://dygraphs.com/", description: "Graphiques JS", tags: ["free"] },
      { name: "JPGraph", url: "http://jpgraph.net/", description: "Librairie de graphes", tags: ["free"] },
      { name: "Visual.ly", url: "http://create.visual.ly/", description: "Création d'infographies", tags: ["free"] },
      { name: "Raphael", url: "http://dmitrybaranovskiy.github.io/raphael", description: "Graphiques vectoriels JS", tags: ["free"] },
      { name: "Charts Hohli", url: "http://charts.hohli.com/", description: "Graphiques simples", tags: ["free"] },
      { name: "Dataviz Catalogue", url: "http://datavizcatalogue.com/", description: "Choisir un type de graphique", tags: ["free"] }
    ]
  },
  {
    category: "Telegram OSINT",
    items: [
      { name: "The OSINT Toolbox", url: "https://www.the-osint-toolbox.com/index.html", description: "Page principale Telegram OSINT", tags: ["free"] },
      { name: "CQCore Telegram Fundamentals", url: "https://cqcore.uk/telegram-fundamentals/", description: "Guide fondamental Telegram", tags: ["free"] },
      { name: "CQCore VM Part 1", url: "https://www.cqcore.uk/telegram-osint-vm-part-1/", description: "VM Telegram OSINT partie 1", tags: ["free"] },
      { name: "CQCore VM Part 2", url: "https://www.cqcore.uk/telegram-osint-vm-part-2/", description: "VM Telegram OSINT partie 2", tags: ["free"] },
      { name: "CQCore VM Part 3", url: "https://www.cqcore.uk/telegram-osint-vm-part-3/", description: "VM Telegram OSINT partie 3", tags: ["free"] },
      { name: "Hatless1der Telegram Basics", url: "https://hatless1der.com/telegram-osint-basics-5-tips-anyone-can-do-right-now/", description: "5 tips Telegram OSINT", tags: ["free"] },
      { name: "Hatless1der From the Outside", url: "https://hatless1der.com/telegram-osint-from-the-outside/", description: "Investigation Telegram externe", tags: ["free"] },
      { name: "OSINT.me Telegram Guide", url: "https://www.osintme.com/index.php/2022/10/18/the-osint-me-ultimate-guide-to-telegram-osint-and-privacy/", description: "Guide Telegram & privacy", tags: ["free"] },
      { name: "GIJN Telegram", url: "https://gijn.org/2022/05/19/how-journalists-can-investigate-on-telegram/", description: "Investigation journalistique sur Telegram", tags: ["free"] },
      { name: "OSINT Team Telegram Security", url: "https://osintteam.blog/telegram-security-best-practices-1b33eb10be05", description: "Bonnes pratiques sécurité Telegram", tags: ["free"] },
      { name: "OSINT Combine Telegram Chats", url: "https://www.osintcombine.com/post/telegram-chats-media", description: "Chats et médias Telegram", tags: ["free"] },
      { name: "FabledOwl Telegram API", url: "https://fabledowlblog.wordpress.com/2017/07/10/telegram-api-for-osint-part-1-users/", description: "API Telegram pour OSINT", tags: ["free"] },
      { name: "ProjetFox Geogramint", url: "https://projetfox.com/en/2022/08/geogramint-an-osint-geolocalization-tool-for-telegram/", description: "Géolocalisation Telegram", tags: ["free"] },
      { name: "TricksFly Telegram Tips", url: "https://www.tricksfly.net/social/telegram/", description: "Astuces Telegram", tags: ["free"] },
      { name: "Awesome Telegram OSINT", url: "https://github.com/ItIsMeCall911/Awesome-Telegram-OSINT", description: "Collection GitHub Telegram OSINT", tags: ["free", "cli"] },
      { name: "Geogramint", url: "https://github.com/Alb-310/Geogramint", description: "Géolocalisation Telegram nearby", tags: ["free", "cli"] },
      { name: "Telegram Nearby Map", url: "https://github.com/tejado/telegram-nearby-map", description: "Carte nearby Telegram", tags: ["free", "cli"] },
      { name: "Telepathy", url: "https://github.com/jordanwildon/Telepathy", description: "Investigation Telegram", tags: ["free", "cli"] },
      { name: "Telerecon", url: "https://github.com/sockysec/Telerecon", description: "Reconnaissance Telegram", tags: ["free", "cli"] },
      { name: "Telegram Tracker", url: "https://github.com/estebanpdl/telegram-tracker", description: "Suivi Telegram", tags: ["free", "cli"] },
      { name: "Telegram Scraper", url: "https://github.com/unnohwn/telegram-scraper", description: "Scraping Telegram", tags: ["free", "cli"] },
      { name: "Telegram Message Analyzer", url: "https://github.com/zqtay/Telegram-Message-Analyzer", description: "Analyse de messages Telegram", tags: ["free", "cli"] },
      { name: "Telegram Similar Channels", url: "https://github.com/SocialLinks-IO/telegram-similar-channels", description: "Chaînes similaires Telegram", tags: ["free", "cli"] },
      { name: "TeleTracker", url: "https://github.com/tsale/TeleTracker", description: "Suivi Telegram", tags: ["free", "cli"] },
      { name: "CCTV Geo-monitoring", url: "https://github.com/IvanGlinkin/CCTV", description: "Geo-monitoring OSINT", tags: ["free", "cli"] },
      { name: "Telegram Transparency", url: "https://github.com/Te-k/telegram-transparency", description: "Transparence et données Telegram", tags: ["free", "cli"] },
      { name: "Save Telegram Chat History", url: "https://github.com/pigpagnet/save-telegram-chat-history", description: "Sauvegarde historique de chat", tags: ["free", "cli"] },
      { name: "TGeocoder", url: "https://github.com/MJCruickshank/TGeocoder", description: "Géocodage Telegram", tags: ["free", "cli"] },
      { name: "TOSINT", url: "https://github.com/drego85/tosint", description: "Outils Telegram OSINT", tags: ["free", "cli"] },
      { name: "TelegramOSINTPolo", url: "https://github.com/Ironship/TelegramOSINTPolo", description: "Projet Telegram OSINT", tags: ["free", "cli"] },
      { name: "TelegramDB", url: "https://www.telegramdb.org/search", description: "Recherche avancée Telegram", tags: ["free"] },
      { name: "TelegramChannels.me", url: "https://telegramchannels.me/", description: "Répertoire canaux Telegram", tags: ["free"] },
      { name: "TDirectory", url: "https://tdirectory.me/", description: "Répertoire Telegram", tags: ["free"] },
      { name: "TGStat", url: "https://tgstat.com/", description: "Stats et analytics Telegram", tags: ["free"] },
      { name: "Telemetr", url: "https://telemetr.io/en/channels", description: "Analytics Telegram", tags: ["free"] },
      { name: "Telemetr.me", url: "https://telemetr.me/", description: "Moteur Telegram", tags: ["free"] },
      { name: "Lyzem", url: "https://lyzem.com/", description: "Recherche Telegram", tags: ["free"] },
      { name: "Combot Top Groups", url: "https://combot.org/top/telegram/groups", description: "Top groupes Telegram", tags: ["free"] },
      { name: "Tlgrm.eu", url: "https://tlgrm.eu/channels", description: "Répertoire canaux Telegram", tags: ["free"] },
      { name: "Telegram-Group.com", url: "https://www.telegram-group.com/en/", description: "Répertoire groupes Telegram", tags: ["free"] },
      { name: "TeleTeg", url: "https://teleteg.com/", description: "Catalogue Telegram", tags: ["free"] },
      { name: "XTea Telegram Search", url: "https://xtea.io/ts_en.html#gsc.tab=0", description: "Recherche Telegram", tags: ["free"] },
      { name: "TGCollector", url: "https://www.tgcollector.com/", description: "Collecteur Telegram", tags: ["free"] },
      { name: "Fragment", url: "https://fragment.com/numbers", description: "Numéros anonymes Telegram", tags: ["free"] },
      { name: "TGInfo", url: "https://limits.tginfo.me/en", description: "Limites Telegram", tags: ["free"] },
      { name: "TelegramTrac", url: "https://telegramtrac.streamlit.app/", description: "App Streamlit Telegram", tags: ["free"] },
      { name: "Telegram-Finder.io", url: "https://www.telegram-finder.io/", description: "Recherche d'entités Telegram", tags: ["free"] },
      { name: "Bellingcat Group Joiner", url: "https://bellingcat.github.io/telegram-group-joiner/", description: "Aide à rejoindre groupes Telegram", tags: ["free"] },
      { name: "TelemetryApp.io", url: "https://www.telemetryapp.io/", description: "Analyse Telegram", tags: ["free"] },
      { name: "Yandex Translate", url: "https://translate.yandex.com/", description: "Traduction utile pour Telegram", tags: ["free"] },
      { name: "Yandex OCR", url: "https://translate.yandex.com/ocr", description: "OCR pour contenus Telegram", tags: ["free"] }
    ]
  },
  {
    category: "Navigateur & OPSEC",
    items: [
      { name: "Firefox", url: "https://www.mozilla.org/", description: "Navigateur principal OSINT", tags: ["free"] },
      { name: "Brave", url: "https://brave.com/", description: "Navigateur privé", tags: ["free"] },
      { name: "Tor Browser", url: "https://www.torproject.org/", description: "Anonymat et dark web", tags: ["free"] },
      { name: "LibreWolf", url: "https://librewolf.net/", description: "Firefox durci", tags: ["free"] },
      { name: "Waterfox", url: "https://www.waterfox.net/", description: "Navigateur alternatif", tags: ["free"] },
      { name: "Vivaldi", url: "https://vivaldi.com/", description: "Navigateur personnalisable", tags: ["free"] },
      { name: "Privacy Badger", url: "https://www.eff.org/privacybadger", description: "Bloqueurs de tracking", tags: ["free"] },
      { name: "Ghostery", url: "https://www.ghostery.com/", description: "Blocage de trackers", tags: ["free"] },
      { name: "NoScript", url: "https://noscript.net/", description: "Contrôle scripts navigateur", tags: ["free"] },
      { name: "Do Not Track", url: "http://donottrack.us/", description: "Ressources vie privée", tags: ["free"] },
      { name: "Qubes OS", url: "https://www.qubes-os.org/", description: "Isolation par VM", tags: ["free"] },
      { name: "Tails", url: "https://tails.boum.org/", description: "OS orienté confidentialité", tags: ["free"] },
      { name: "Bitwarden", url: "https://bitwarden.com/", description: "Gestionnaire de mots de passe", tags: ["free"] },
      { name: "KeePass", url: "http://keepass.info/", description: "Gestionnaire local de mots de passe", tags: ["free"] },
      { name: "ProtonMail", url: "https://protonmail.com/", description: "Email chiffré", tags: ["free"] },
      { name: "Signal", url: "https://signal.org/", description: "Messagerie privée", tags: ["free"] },
      { name: "0bin", url: "https://0bin.net/", description: "Paste chiffré côté client", tags: ["free"] },
      { name: "JustDeleteMe", url: "http://justdelete.me/", description: "Supprimer des comptes facilement", tags: ["free"] },
      { name: "SSD EFF", url: "https://ssd.eff.org/", description: "Guides de sécurité numérique", tags: ["free"] },
      { name: "Digital Footprint Checker", url: "https://www.digitalfootprintcheck.com/free-checker.html", description: "Audit rapide empreinte numérique", tags: ["free"] }
    ]
  },
  {
    category: "Outils IA",
    items: [
      { name: "AnonChatGPT", url: "https://anonchatgpt.com/", description: "Chat IA anonyme", tags: ["free"] },
      { name: "Monica", url: "https://monica.im/", description: "Assistant IA navigateur", tags: ["free", "paid"] },
      { name: "Claude", url: "https://claude.ai/", description: "Assistant IA d'analyse", tags: ["free", "paid"] },
      { name: "Gemini", url: "https://gemini.google.com/", description: "Assistant IA Google", tags: ["free", "paid"] },
      { name: "Poe", url: "https://poe.com/", description: "Agrégateur de modèles IA", tags: ["free", "paid"] },
      { name: "Copilot", url: "https://copilot.microsoft.com/", description: "Assistant IA Microsoft", tags: ["free"] },
      { name: "You.com", url: "https://you.com/", description: "Recherche IA avec sources", tags: ["free"] },
      { name: "Anything.com", url: "https://anything.com/", description: "Assistant productivité", tags: ["free"] },
      { name: "Perplexity", url: "https://www.perplexity.ai/", description: "Recherche IA sourcée", tags: ["free"] },
      { name: "Exa AI", url: "https://exa.ai/", description: "Recherche sémantique web", tags: ["paid"] },
      { name: "Phind", url: "https://www.phind.com/", description: "Recherche IA technique", tags: ["free"] },
      { name: "Consensus", url: "https://consensus.app/", description: "Recherche académique IA", tags: ["free"] },
      { name: "Elicit", url: "https://elicit.com/", description: "Revue de littérature assistée", tags: ["free"] },
      { name: "Scite", url: "https://scite.ai/", description: "Analyse citations scientifiques", tags: ["paid"] },
      { name: "iAsk", url: "https://iask.ai/", description: "Question-réponse IA", tags: ["free"] },
      { name: "YouLearn", url: "https://www.youlearn.ai/", description: "Apprentissage IA à partir de contenus", tags: ["free"] },
      { name: "NotebookLM", url: "https://notebooklm.google/", description: "Analyser ses documents", tags: ["free"] },
      { name: "ChatPDF", url: "https://www.chatpdf.com/", description: "Parler avec un PDF", tags: ["free"] },
      { name: "Leonardo AI", url: "https://leonardo.ai/", description: "Génération d'images", tags: ["free", "paid"] },
      { name: "Adobe Firefly", url: "https://firefly.adobe.com/", description: "Génération d'images Adobe", tags: ["free", "paid"] },
      { name: "StockImg AI", url: "https://stockimg.ai/", description: "Images marketing générées", tags: ["paid"] },
      { name: "SheetPlus AI", url: "https://sheetplus.ai/", description: "Formules Excel / Sheets", tags: ["paid"] },
      { name: "Decktopus", url: "https://www.decktopus.com/", description: "Présentations IA", tags: ["paid"] },
      { name: "10Web", url: "https://10web.io/", description: "Création de sites web IA", tags: ["paid"] },
      { name: "Poised", url: "https://www.poised.com/", description: "Coach de communication IA", tags: ["paid"] },
      { name: "AgentGPT", url: "https://agentgpt.reworkd.ai/", description: "Agents IA autonomes", tags: ["free"] },
      { name: "Hugging Face", url: "https://huggingface.co/", description: "Plateforme modèles IA", tags: ["free"] },
      { name: "Groq", url: "https://groq.com/", description: "Inference IA rapide", tags: ["free"] },
      { name: "Geospy", url: "https://geospy.ai/", description: "IA de géolocalisation d'image", tags: ["paid"] },
      { name: "Geospy.ai", url: "https://geospy.ai", description: "Analyse prédictive de localisation géographique par IA", tags: ["free"] },
      { name: "AskNews", url: "https://asknews.app/", description: "Veille d'actualité par IA", tags: ["paid"] },
      { name: "MyMapAI", url: "https://www.mymap.ai/", description: "Cartes mentales et visualisation IA", tags: ["free"] },
      { name: "DuckDuckGo AI Chat", url: "https://duck.ai/", description: "Chat IA plus privé", tags: ["free"] },
      { name: "Grok", url: "https://x.ai/", description: "IA xAI pour veille réseaux", tags: ["paid"] },
      { name: "Brave Leo", url: "https://brave.com/leo/", description: "Assistant IA navigateur", tags: ["free"] },
      { name: "n8n", url: "https://n8n.io/", description: "Automatisation open source", tags: ["free", "cli"] },
      { name: "Make", url: "https://www.make.com/", description: "Automatisation et scénarios", tags: ["free", "paid"] },
      { name: "Hive AI Detector", url: "https://thehive.ai/", description: "Détection médias générés par IA", tags: ["free"] }
    ]
  },
  {
    category: "Ressources",
    items: [
      { name: "IntelTechniques", url: "https://inteltechniques.com/", description: "Collection majeure d'outils OSINT", tags: ["free"] },
      { name: "OSINT Framework", url: "https://osintframework.com/", description: "Annuaire visuel OSINT", tags: ["free"] },
      { name: "OSINT Dojo", url: "https://www.osintdojo.com/resources/", description: "Guides & formation", tags: ["free"] },
      { name: "OSINT Handbook", url: "https://www.osinthandbook.com/", description: "Guide structuré OSINT", tags: ["free"] },
      { name: "Bellingcat", url: "https://www.bellingcat.com/", description: "Enquêtes et formation", tags: ["free"] },
      { name: "OSINT Curio.us", url: "https://osintcurio.us/", description: "Ressources et articles OSINT", tags: ["free"] },
      { name: "NixIntel", url: "https://nixintel.info/", description: "Blog et techniques OSINT", tags: ["free"] },
      { name: "OSINT.sh", url: "https://osint.sh/", description: "Collection de ressources", tags: ["free"] },
      { name: "OSINT Tool", url: "https://www.osint-tool.com/", description: "Répertoire d'outils", tags: ["free"] },
      { name: "OSINT Combine", url: "https://www.osintcombine.com/", description: "Ressources et formation", tags: ["free"] },
      { name: "Toddington", url: "https://www.toddington.com/resources/cheat-sheets/", description: "Cheat sheets et ressources", tags: ["free"] },
      { name: "OSINT Team", url: "https://osintteam.blog/", description: "Blog OSINT", tags: ["free"] },
      { name: "SecJuice", url: "https://www.secjuice.com/", description: "Recherche sécurité et OSINT", tags: ["free"] },
      { name: "OSINTME", url: "https://www.osintme.com/", description: "Guides pratiques", tags: ["free"] },
      { name: "Trace Labs", url: "https://www.tracelabs.org/", description: "Communauté et CTF", tags: ["free"] },
      { name: "Forensic OSINT", url: "https://www.forensicosint.com/", description: "Formations et ressources", tags: ["free"] },
      { name: "OH SHINT!", url: "https://ohshint.gitbook.io/oh-shint-its-a-blog/", description: "Ressources web OSINT", tags: ["free"] },
      { name: "OSINT Industries", url: "https://osint.industries/", description: "Enrichissement de profils", tags: ["free", "paid"] },
      { name: "Aware Online Tools", url: "https://www.aware-online.com/en/osint-tools/", description: "Répertoire d'outils", tags: ["free"] },
      { name: "MetaOSINT", url: "https://metaosint.github.io/", description: "Répertoire communautaire", tags: ["free"] },
      { name: "Reuser's Repertorium", url: "https://rr.reuser.biz/", description: "Ressources OSINT et SOCMINT", tags: ["free"] },
      { name: "SPJ Toolbox", url: "https://www.journaliststoolbox.org/", description: "Outils pour journalistes", tags: ["free"] },
      { name: "Cyber Detective", url: "https://cybdetective.com/", description: "Ressources et cours OSINT", tags: ["free"] },
      { name: "Daniel Durnea", url: "https://www.danieldurnea.com/", description: "Ressources et outils OSINT", tags: ["free"] },
      { name: "FBI Tools", url: "https://github.com/eeeeeeeeee-code/fbi-tools", description: "Collection d'outils d'enquête", tags: ["free"] },
      { name: "Awesome OSINT", url: "https://github.com/jivoi/awesome-osint", description: "Mega-liste OSINT open source", tags: ["free"] },
      { name: "OSINT Encyclopedia", url: "https://osint.link/", description: "Ressources et liens par catégories", tags: ["free"] },
      { name: "OSINT for Countries", url: "https://github.com/paulpogoda/OSINT-For-Countries", description: "Ressources par pays", tags: ["free"] },
      { name: "OSINT Essentials", url: "https://github.com/Angela-D/OSINT-essentials", description: "Essentiels OSINT communautaires", tags: ["free"] },
      { name: "OSINT Toolkit", url: "https://start.me/p/lLrEYQ/osint4all", description: "Collection de départ OSINT", tags: ["free"] },
      { name: "IntelligenceX Tools", url: "https://intelx.io/tools", description: "Outils Intelligence X", tags: ["free", "paid"] },
      { name: "Verification Toolset", url: "https://verificationhandbook.com/", description: "Vérification et fact-checking", tags: ["free"] },
      { name: "AML Toolbox", url: "https://start.me/p/rx6Qj8/aml-toolbox", description: "Outils AML et due diligence", tags: ["free"] },
      { name: "CTI Resources", url: "https://github.com/0x4D31/awesome-threat-detection", description: "Ressources CTI", tags: ["free"] },
      { name: "OSINT International", url: "https://osintinternational.com/", description: "Communauté et ressources", tags: ["free"] },
      { name: "World Resources", url: "https://github.com/Ph055a/OSINT_Collection", description: "Collection de ressources mondiales", tags: ["free"] }
    ]
  },
  {
    category: "People Search & Profils",
    items: [
      { name: "Pipl", url: "https://pipl.com/", description: "Recherche d'identité approfondie", tags: ["paid"] },
      { name: "SocialCatfish", url: "https://socialcatfish.com/", description: "Recherche d'identité et de catfish", tags: ["paid"] },
      { name: "Einvestigator", url: "https://www.einvestigator.com/", description: "Ressources people search", tags: ["free"] },
      { name: "ExpertPages", url: "http://expertpages.com/", description: "Répertoire de personnes et profils", tags: ["free"] },
      { name: "Follow.net", url: "http://follow.net/", description: "Recherche de profils", tags: ["free"] },
      { name: "Gerdoo", url: "http://gerdoo.me/", description: "Agrégation de profils sociaux", tags: ["free"] },
      { name: "All-IO", url: "http://all-io.net/", description: "Recherche d'identité et données publiques", tags: ["free"] },
      { name: "PredictaSearch", url: "https://predictasearch.com/", description: "Recherche de personnes", tags: ["free"] },
      { name: "That's Them People Search", url: "https://thatsthem.com/", description: "Adresses, emails et téléphones publics", tags: ["free"] }
    ]
  },
  {
    category: "Web, Traffic & SEO",
    items: [
      { name: "Ahrefs", url: "https://ahrefs.com/", description: "Analyse SEO et backlinks", tags: ["paid"] },
      { name: "SEMrush", url: "https://www.semrush.com/", description: "SEO et visibilité de domaines", tags: ["paid"] },
      { name: "Similarweb", url: "https://www.similarweb.com/", description: "Trafic estimé et audience", tags: ["free", "paid"] },
      { name: "Competeshark", url: "http://competeshark.com/", description: "Analyse concurrence web", tags: ["free"] },
      { name: "DedicatedOrNot", url: "http://dedicatedornot.com/", description: "Détection hébergement mutualisé ou dédié", tags: ["free"] },
      { name: "Deturl", url: "http://deturl.com/", description: "Développer les URLs raccourcies", tags: ["free"] },
      { name: "BlackListChecker", url: "https://blacklistchecker.com/", description: "Vérification blacklist IP / domaine", tags: ["free"] },
      { name: "Webscout", url: "https://webscout.io/", description: "Analyse web et changements", tags: ["free", "paid"] },
      { name: "WPScan", url: "https://wpscan.com/", description: "Sécurité WordPress et détection de plugins", tags: ["free", "paid"] }
    ]
  },
  {
    category: "Fact-check & Vérification",
    items: [
      { name: "Snopes", url: "https://www.snopes.com/", description: "Vérification de rumeurs et intox", tags: ["free"] },
      { name: "Meedan Check", url: "https://meedan.com/check", description: "Fact-check collaboratif", tags: ["free"] },
      { name: "BBC Monitoring", url: "https://www.bbc.com/monitoring", description: "Veille média et vérification", tags: ["free"] },
      { name: "Hosted AP", url: "http://hosted.ap.org/", description: "Flux Associated Press", tags: ["free"] },
      { name: "Edition CNN", url: "http://edition.cnn.com/", description: "Source presse internationale", tags: ["free"] },
      { name: "AllTop", url: "http://alltop.com/", description: "Agrégateur d'actualités thématiques", tags: ["free"] },
      { name: "Flipboard", url: "http://flipboard.com/", description: "Agrégateur de contenus", tags: ["free"] },
      { name: "Digg Reader", url: "http://digg.com/login?next=%2Freader", description: "Lecture de flux et veille", tags: ["free"] }
    ]
  },
  {
    category: "Module Colombie",
    items: [
      { name: "SIPLAFT", url: "https://www.siplaft.com", description: "Analyse et vérification des risques de blanchiment d'argent", tags: ["free"] },
      { name: "Superintendencia de Notariado y Registro", url: "https://www.supernotariado.gov.co", description: "Consultation officielle des registres de propriété immobilière", tags: ["free"] },
      { name: "Censo nacional electoral", url: "https://www.registraduria.gov.co", description: "Vérification du registre électoral national des citoyens", tags: ["free"] },
      { name: "RUES", url: "https://www.rues.org.co", description: "Registre Unique Empresarial pour la vérification légale des entreprises", tags: ["free"] },
      { name: "RNEC", url: "https://www.registraduria.gov.co", description: "Vérification de l'état légal des cartes d'identité (Cédula) en ligne", tags: ["free"] }
    ]
  }
];

const BOT_PATTERNS = [/^@/i, /bot/i, /tgbots\.io/i];

export function normalizeToolkit(data: ToolCategory[]): ToolCategory[] {
  return data
    .map(section => {
      const seen = new Set<string>();
      const items = section.items
        .filter(item => !(section.category === 'Telegram OSINT' && BOT_PATTERNS.some(rx => rx.test(item.name) || rx.test(item.url))))
        .filter(item => {
          const key = `${item.name}`.trim().toLowerCase() + '|' + `${item.url}`.trim().toLowerCase();
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }));
      return { ...section, items };
    })
    .filter(section => section.items.length > 0);
}

export function getDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}