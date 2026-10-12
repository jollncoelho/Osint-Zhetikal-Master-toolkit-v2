/**
 * build-dataset.mjs
 * ---------------------------------------------------------------------------
 * Transforme le jeu de données brut (scripts/source/toolkit.raw.json) en un
 * dataset propre et exploitable (src/data/toolkit.json).
 *
 * Ce que fait le script :
 *   1. Nettoie les noms d'outils (espaces, tirets, casse).
 *   2. Détecte le "type de ressource" à partir de l'URL (GitHub, Tor, Google
 *      CSE, documentation, API, outil web) — information fiable et vérifiable.
 *   3. Remplace les descriptions inutilisables (« No description », « Outil X »)
 *      par une description fonctionnelle en français, déduite du nom de l'outil
 *      et de sa catégorie.
 *   4. Dédoublonne par URL, attribue un identifiant stable et calcule les stats.
 *
 * Usage :  node scripts/build-dataset.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const RAW_PATH = path.join(__dirname, 'source', 'toolkit.raw.json');
const OUT_PATH = path.join(ROOT, 'src', 'data', 'toolkit.json');

/* ------------------------------------------------------------------ */
/* 1. Type de ressource                                                */
/* ------------------------------------------------------------------ */

export function detectKind(url) {
  const u = url.toLowerCase();
  if (u.includes('github.com')) return 'github';
  if (u.includes('.onion')) return 'tor';
  if (u.includes('cse.google.com') || u.includes('cse.googleusercontent')) return 'cse';
  if (u.includes('start.me')) return 'startpage';
  if (u.includes('readthedocs') || u.includes('/docs') || u.includes('documentation')) return 'docs';
  if (/(^|\.|\/)api[.\/]/.test(u)) return 'api';
  return 'web';
}

export const KIND_LABELS = {
  github: 'GitHub / Code',
  tor: 'Tor / Dark web',
  cse: 'Google CSE',
  startpage: 'Startpage',
  docs: 'Documentation',
  api: 'API',
  web: 'Outil web',
};

/* ------------------------------------------------------------------ */
/* 2. Descriptions fonctionnelles                                      */
/* ------------------------------------------------------------------ */

const CATEGORY_OBJECT = {
  'Téléphones': 'numéros de téléphone',
  'Emails': 'adresses e-mail',
  'Usernames': "noms d'utilisateur",
  'Domaines & DNS': 'domaines et enregistrements réseau',
  'Breaches & Leaks': 'bases de données compromises',
  'Métadonnées': 'métadonnées de fichiers',
  'Moteurs de recherche': 'sources et ressources web',
  'Images inversées': 'images',
  'Réseaux sociaux': 'profils et contenus de réseaux sociaux',
  'Géolocalisation': 'lieux et coordonnées géographiques',
  'Archives web': 'pages web archivées',
  'Entreprises': "informations d'entreprises",
  'Code & Repositories': 'dépôts de code',
  'Monitoring & Threat Intel': "indicateurs de menace et d'infrastructure",
  'Outils IA': "la génération et l'analyse",
  'Ressources': 'la veille OSINT',
  'People Search & Profils': 'personnes et profils publics',
  'Telegram OSINT': 'canaux, groupes et bots Telegram',
  'Visualisation & DataViz': 'données et graphiques',
  'Transport & Véhicules': 'véhicules et transports',
  'Module Colombie': 'sources propres à la Colombie',
  'Web, Traffic & SEO': 'trafic web et référencement',
  'Documents & Data': 'documents et jeux de données',
  'Fact-check & Vérification': 'affirmations et sources',
};

// Sujet précis déduit du nom de l'outil (prioritaire sur la catégorie).
const TOPIC_RULES = [
  [/\b(exif|metadata|meta[ -]?data)\b/, 'métadonnées de fichiers'],
  [/\b(video|vimeo|dailymotion)s?\b/, 'vidéos'],
  [/\b(image|photo|picture|face|facial|avatar)s?\b/, 'images'],
  [/\b(email|e-?mail|mailbox)(es|s)?\b/, 'adresses e-mail'],
  [/\b(phone|telephone|carrier|mobile|msisdn)s?\b/, 'numéros de téléphone'],
  [/\b(username|pseudo|handle|nickname)s?\b/, "noms d'utilisateur"],
  [/\b(domain|dns|whois|subdomain|hostname|ssl|certificate)s?\b/, 'noms de domaine et enregistrements réseau'],
  [/\b(breach|leak|pastebin|dox|combo ?list)s?\b/, 'bases de données compromises'],
  [/\b(bitcoin|btc|crypto|wallet|blockchain|ethereum)\b/, 'adresses de cryptomonnaie'],
  [/\b(vehicle|plate|vin|aircraft|flight|vessel|maritime)s?\b/, 'véhicules et transports'],
  [/\b(company|business|corporate|société)s?\b/, "informations d'entreprises"],
  [/\b(instagram|insta)\b/, 'profils et contenus Instagram'],
  [/\b(facebook|fb)\b/, 'profils et contenus Facebook'],
  [/\b(twitter|x\.com|tweet)s?\b/, 'profils et contenus X (Twitter)'],
  [/\b(tiktok)\b/, 'profils et contenus TikTok'],
  [/\b(linkedin)\b/, 'profils et entreprises LinkedIn'],
  [/\b(reddit)\b/, 'contenus Reddit'],
  [/\b(discord)\b/, 'serveurs et profils Discord'],
  [/\b(telegram)\b/, 'canaux, groupes et bots Telegram'],
  [/\b(twitch)\b/, 'chaînes et profils Twitch'],
  [/\b(youtube)\b/, 'chaînes et vidéos YouTube'],
  [/\b(github|gitlab|repository|repos?|source code)\b/, 'dépôts de code'],
  [/\b(maps?|geo|geoloc|coordinates|satellite|street view)\b/, 'zones et coordonnées'],
  [/\b(news|press|newspaper)s?\b/, 'articles de presse'],
  [/\b(hastebin|ghostbin)\b/, 'contenus de type « paste »'],
  [/\b(wifi|ssid|bssid|wireless)\b/, 'réseaux sans fil'],
  [/\b(people|persons?|identity|identit)/, 'personnes et identités'],
  [/\b(dark ?web|darknet|onion)\b/, 'services du dark web'],
  [/\b(website|web ?site|url|link|page)s?\b/, 'sites et pages web'],
];

/**
 * Verbe + préposition. La préposition est appliquée séparément pour gérer
 * correctement les élisions françaises (« de images » → « d'images »).
 */
const ACTION_RULES = [
  [/\b(checker|check|verify|verif|validat|valid)\b/, { verb: 'Vérification', prep: 'de', label: 'Vérification' }],
  [/\b(tracker|tracking|track|monitor|monitoring|watch|alert|notif)\b/, { verb: 'Suivi', prep: 'de', label: 'Suivi' }],
  [/\b(downloader|download|grabber|grab|ripper|scraper|scrap|extract)\b/, { verb: 'Extraction', prep: 'de', label: 'Extraction' }],
  [/\b(generator|generate|maker|builder|creator|create)\b/, { verb: 'Génération', prep: 'de', label: 'Génération' }],
  [/\b(converter|convert|parser|parse|decoder|decode|encoder|encode)\b/, { verb: 'Conversion', prep: 'de', label: 'Conversion' }],
  [/\b(analy|analyse|analysis|insight|stats|statistic|metric)\b/, { verb: 'Analyse', prep: 'de', label: 'Analyse' }],
  [/\b(wayback|snapshot)\b/, { verb: 'Consultation', prep: 'de', label: 'Archives' }],
  [/\b(mapper|mapping|maps?|cartograph|geoloc)\b/, { verb: 'Cartographie', prep: 'de', label: 'Cartographie' }],
  [/\b(visual|graph|chart|dashboard|dataviz|diagram)\b/, { verb: 'Visualisation', prep: 'de', label: 'Visualisation' }],
  [/\b(identify|identification|resolver|resolve|lookup|look ?up)\b/, { verb: 'Identification', prep: 'de', label: 'Identification' }],
  [/\b(scanner|scan|reconnaissance|recon|enumerat)\b/, { verb: 'Scan', prep: 'de', label: 'Scan' }],
  [/\b(searcher|search|find|finder|query|explore)\b/, { verb: 'Recherche', prep: 'de', label: 'Recherche' }],
  [/\b(database|directory|list|index|catalog|collection|aggregator|hub|portal)\b/, { verb: 'Annuaire', prep: 'de', label: 'Annuaire' }],
  [/\b(remove|remover|clean|cleaner|strip|eraser|anonymiz)\b/, { verb: 'Nettoyage', prep: 'de', label: 'Nettoyage' }],
  [/\b(translate|translation|traduction)\b/, { verb: 'Traduction', prep: 'de', label: 'Traduction' }],
  [/\b(automation|automated)\b/, { verb: 'Automatisation', prep: 'pour', label: 'Automatisation' }],
];

// Action imposée par la catégorie (plus pertinente que le type de ressource).
const CATEGORY_DEFAULT_ACTION = {
  'Moteurs de recherche': { verb: 'Recherche', prep: 'de', label: 'Recherche' },
  'Images inversées': { verb: 'Recherche inversée', prep: 'de', label: 'Recherche inversée' },
  'Archives web': { verb: 'Consultation', prep: 'de', label: 'Archives' },
  'Breaches & Leaks': { verb: 'Recherche', prep: 'dans', label: 'Recherche de fuites' },
  'Ressources': { verb: 'Ressource de référence', prep: 'sur', label: 'Ressource' },
  'Outils IA': { verb: 'Assistant IA', prep: 'pour', label: 'IA' },
  'Visualisation & DataViz': { verb: 'Visualisation', prep: 'de', label: 'Visualisation' },
  'Fact-check & Vérification': { verb: 'Vérification', prep: 'de', label: 'Vérification' },
  'Module Colombie': { verb: 'Recherche', prep: 'de', label: 'Recherche' },
  'Documents & Data': { verb: 'Consultation', prep: 'de', label: 'Consultation' },
};

// Action par défaut selon le type de ressource (quand le nom ne dit rien).
const KIND_DEFAULT_ACTION = {
  github: { verb: 'Projet open-source', prep: 'pour', label: 'Projet open-source' },
  cse: { verb: 'Moteur de recherche Google', prep: 'colon', label: 'Google CSE' },
  docs: { verb: 'Documentation', prep: 'colon', label: 'Documentation' },
  api: { verb: 'API', prep: 'colon', label: 'API' },
  tor: { verb: 'Service Tor', prep: 'colon', label: 'Tor' },
  startpage: { verb: 'Page de liens', prep: 'colon', label: 'Startpage' },
  web: { verb: 'Recherche', prep: 'de', label: 'Recherche' },
};

const DEFAULT_ACTION = { verb: 'Recherche', prep: 'de', label: 'Recherche' };

const JUNK_DESCRIPTION = /^\s*(no description|n\/?a|aucune? description|-\s*|\.)\s*$/i;

export function isJunkDescription(desc, name) {
  if (!desc) return true;
  const d = desc.trim();
  if (JUNK_DESCRIPTION.test(d)) return true;
  if (/^outil\s+/i.test(d) && d.length < name.length + 12) return true;
  return false;
}

function pickRule(rules, haystack, fallback) {
  for (const [re, value] of rules) {
    if (re.test(haystack)) return value;
  }
  return fallback;
}

/** Applique la préposition en respectant les élisions françaises. */
function withPrep(prep, topic) {
  switch (prep) {
    case 'de': {
      if (/^[aeiouéèêàâîôûyh]/i.test(topic)) return ` d'${topic}`;
      if (/^les\s/i.test(topic)) return ` des ${topic.slice(4)}`;
      if (/^des\s/i.test(topic)) return ` de ${topic.slice(4)}`;
      if (/^l'/i.test(topic)) return ` de ${topic}`;
      return ` de ${topic}`;
    }
    case 'pour':
      return ` pour ${topic}`;
    case 'sur':
      return ` sur ${topic}`;
    case 'dans':
      return ` dans les ${topic}`;
    case 'colon':
      return ` : ${topic}`;
    default:
      return ` ${topic}`;
  }
}

/** Nettoie un nom d'outil pour l'affichage. */
export function cleanName(name) {
  let n = String(name || '').trim();
  n = n.replace(/\s+/g, ' ');
  // Retire les suffixes parasites : « Outil — Site », « Page ‹ Site », « Page · Site »
  n = n.replace(/\s*[‹«]\s*.*$/, '');
  n = n.replace(/\s+[|—–]\s+[^|—–]{0,40}$/, '');
  n = n.replace(/^[•\-–—\s]+/, '');
  if (n.length > 0 && n === n.toLowerCase()) {
    n = n.replace(/^./, c => c.toUpperCase());
  }
  return n || 'Outil sans nom';
}

/** Construit une description fonctionnelle en français. */
export function buildDescription(name, category, kind = 'web') {
  const haystack = ` ${name.toLowerCase()} `;
  const topic = pickRule(TOPIC_RULES, haystack, CATEGORY_OBJECT[category] ?? 'ressources OSINT');

  // 1) Nom explicite (« Discord Bots », « Email Checker »…) → règle du nom.
  let action = pickRule(ACTION_RULES, haystack, null);
  // 2) Liste de type « Awesome-… » → formulation dédiée.
  if (!action && /^awesome/i.test(name.trim())) {
    action = { verb: 'Liste de ressources', prep: 'colon', label: 'Ressources' };
  }
  // 3) Sinon action imposée par la catégorie, puis par le type de ressource.
  if (!action) action = CATEGORY_DEFAULT_ACTION[category] ?? KIND_DEFAULT_ACTION[kind] ?? DEFAULT_ACTION;

  const description = `${action.verb}${withPrep(action.prep, topic)}.`.replace(/\s+/g, ' ');
  return { description, action: action.label };
}

/* ------------------------------------------------------------------ */
/* 3. Assemblage                                                       */
/* ------------------------------------------------------------------ */

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 70);
}

function main() {
  const raw = JSON.parse(fs.readFileSync(RAW_PATH, 'utf8'));
  const seenUrls = new Set();
  const seenIds = new Set();
  const categories = [];
  let enriched = 0;
  let kept = 0;
  let duplicates = 0;

  for (const section of raw) {
    const items = [];

    for (const tool of section.items) {
      const url = String(tool.url || '').trim();
      if (!url || seenUrls.has(url)) {
        duplicates++;
        continue;
      }
      seenUrls.add(url);

      const name = cleanName(tool.name);
      const kind = detectKind(url);
      // « free » est porté par 100 % des outils : ce n'est pas une information
      // discriminante, on ne conserve donc que les tags réellement distinctifs.
      const tags = [...new Set((tool.tags || []).map(t => String(t).toLowerCase()))].filter(
        tag => tag !== 'free'
      );

      let description;
      let action = null;
      if (isJunkDescription(tool.description, name)) {
        const built = buildDescription(name, section.category, kind);
        description = built.description;
        action = built.action;
        enriched++;
      } else {
        description = String(tool.description).trim();
        kept++;
      }

      // Identifiant stable et unique (sert de clé React et de lien profond).
      let id = slugify(name) || slugify(new URL(url).hostname.replace(/^www\./, ''));
      if (seenIds.has(id)) {
        let i = 2;
        while (seenIds.has(`${id}-${i}`)) i++;
        id = `${id}-${i}`;
      }
      seenIds.add(id);

      items.push({ id, name, url, description, tags, kind, ...(action ? { action } : {}) });
    }

    if (items.length > 0) {
      categories.push({ category: section.category, items });
    }
  }

  // Catégories triées par nombre d'outils décroissant.
  categories.sort((a, b) => b.items.length - a.items.length);

  const kindCounts = {};
  for (const c of categories) {
    for (const t of c.items) kindCounts[t.kind] = (kindCounts[t.kind] || 0) + 1;
  }

  const dataset = {
    metadata: {
      generated: new Date().toISOString(),
      total: categories.reduce((s, c) => s + c.items.length, 0),
      categories: categories.length,
      descriptionsEnriched: enriched,
      descriptionsOriginales: kept,
      doublonsSupprimes: duplicates,
      kinds: kindCounts,
    },
    categories,
  };

  fs.writeFileSync(OUT_PATH, JSON.stringify(dataset, null, 1) + '\n', 'utf8');

  console.log(`✔ ${OUT_PATH}`);
  console.log(`  outils            : ${dataset.metadata.total}`);
  console.log(`  catégories        : ${dataset.metadata.categories}`);
  console.log(`  descriptions générées : ${enriched}`);
  console.log(`  descriptions d'origine : ${kept}`);
  console.log(`  doublons retirés  : ${duplicates}`);
  console.log(`  types             : ${JSON.stringify(kindCounts)}`);
}

main();
