import { Tool, ToolCategory } from '../data/tools';

export function favoritesToJSON(tools: Tool[]): string {
  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      count: tools.length,
      favorites: tools.map(t => ({ name: t.name, url: t.url, description: t.description, tags: t.tags })),
    },
    null,
    2
  );
}

export function favoritesToMarkdown(tools: Tool[]): string {
  const lines = [
    `# Mes favoris OSINT — Zhetikal Master-toolkit`,
    ``,
    `> Exporté le ${new Date().toLocaleString('fr-FR')} — ${tools.length} outil(s)`,
    ``,
  ];
  for (const t of tools) {
    lines.push(`- **[${t.name}](${t.url})** — ${t.description} ${t.tags.map(tag => `\`${tag}\``).join(' ')}`);
  }
  return lines.join('\n');
}

export function downloadFile(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function collectFavoriteTools(
  toolkit: ToolCategory[],
  favorites: Set<string>
): Tool[] {
  const result: Tool[] = [];
  for (const section of toolkit) {
    for (const item of section.items) {
      if (favorites.has(item.url)) result.push(item);
    }
  }
  return result;
}
