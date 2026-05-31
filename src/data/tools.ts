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
      { name: "Withbex", url: "https://vedbex.com", description: "Outil de pivot pour lier un numéro de téléphone à un compte Skype", tags: ["free"] },
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
      { name: "Who