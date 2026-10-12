import { TOOL_BY_ID, KIND_LABELS, Tool } from '../data/tools';

/** Récupère les outils favoris, dans l'ordre d'ajout. */
export function collectFavoriteTools(ids: string[]): Tool[] {
  return ids.map(id => TOOL_BY_ID.get(id)).filter((tool): tool is Tool => Boolean(tool));
}

export function toolsToJSON(tools: Tool[]): string {
  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      count: tools.length,
      tools: tools.map(t => ({
        name: t.name,
        url: t.url,
        description: t.description,
        type: KIND_LABELS[t.kind],
        tags: t.tags,
      })),
    },
    null,
    2
  );
}

export function toolsToMarkdown(tools: Tool[], title = 'Mes favoris OSINT — Zhetikal Master-Toolkit'): string {
  const lines = [
    `# ${title}`,
    '',
    `> Exporté le ${new Date().toLocaleString('fr-FR')} — ${tools.length} outil(s)`,
    '',
  ];
  for (const tool of tools) {
    const meta = [KIND_LABELS[tool.kind], ...tool.tags].filter(Boolean).join(' · ');
    lines.push(`- **[${tool.name}](${tool.url})** — ${tool.description} _(${meta})_`);
  }
  return lines.join('\n');
}

/** Version texte brut : une URL par ligne (pratique pour coller dans un tableur ou un script). */
export function toolsToUrlList(tools: Tool[]): string {
  return tools.map(t => t.url).join('\n');
}

export function downloadFile(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/** Copie du texte dans le presse-papiers, avec repli pour les contextes non sécurisés. */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* on tente le repli ci-dessous */
  }
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}
