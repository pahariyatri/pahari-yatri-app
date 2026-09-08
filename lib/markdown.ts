import Markdoc from "@markdoc/markdoc";

/** Convert raw MDX/markdown source into HTML via Markdoc, so paragraphs,
 *  headings, and emphasis render as real markup — not literal `## `/`**`
 *  text — and the full text ships in the static HTML (readable without JS,
 *  indexable by crawlers). Shared by every page that renders a Keystatic
 *  `fields.mdx` content field as a document body. */
export function markdownToHtml(source: string): string {
  const ast = Markdoc.parse(source);
  const content = Markdoc.transform(ast);
  return Markdoc.renderers.html(content);
}

/** Shift every heading in rendered HTML down one level (h1→h2 … h5→h6, h6
 *  stays h6). Page templates already render their own real `<h1>{title}</h1>`
 *  from the entry's title field; a body that starts with its own `# Title`
 *  would otherwise produce a second, duplicate `<h1>` on the same page. */
export function demoteHeadings(html: string): string {
  return html.replace(
    /<(\/?)h([1-6])((?:\s[^>]*)?)>/gi,
    (_match, slash, level, attrs) => {
      const newLevel = Math.min(6, Number(level) + 1);
      return `<${slash}h${newLevel}${slash ? "" : attrs}>`;
    }
  );
}
