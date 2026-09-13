const MAX_SLUG_LENGTH = 40;
const MIN_HEADING_DEPTH = 2;

const PROSE_WORDS_PER_MINUTE = 220;
const CODE_LINES_PER_MINUTE = 60;
const CODE_SKIMMED_AFTER_LINES = 20;
const CODE_SKIMMED_WEIGHT = 0.25;

function slugify(text) {
  const words = text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

  let slug = "";
  for (const word of words) {
    if (slug && slug.length + 1 + word.length > MAX_SLUG_LENGTH) break;
    slug = slug ? `${slug}-${word}` : word;
  }
  return slug;
}

function uniqueSlug(base, taken) {
  let slug = base;
  let suffix = 1;
  while (taken.has(slug)) slug = `${base}-${++suffix}`;
  taken.add(slug);
  return slug;
}

function textOf(node) {
  if (node.type === "text" || node.type === "inlineCode") return node.value;
  if ("children" in node) return node.children.map(textOf).join("");
  return "";
}

function countWords(value) {
  return value.split(/\s+/).filter(Boolean).length;
}

function weighCodeLines(value) {
  const lines = value.split("\n").length;
  if (lines <= CODE_SKIMMED_AFTER_LINES) return lines;
  return (
    CODE_SKIMMED_AFTER_LINES +
    (lines - CODE_SKIMMED_AFTER_LINES) * CODE_SKIMMED_WEIGHT
  );
}

function collect(tree) {
  const headings = [];
  const taken = new Set();
  let words = 0;
  let codeLines = 0;
  let minDepth = Infinity;

  const walk = (node) => {
    switch (node.type) {
      case "code":
        codeLines += weighCodeLines(node.value);
        return;
      case "text":
      case "inlineCode":
        words += countWords(node.value);
        return;
      case "image":
        words += countWords(node.alt ?? "");
        return;
      case "mdxjsEsm":
      case "mdxFlowExpression":
      case "mdxTextExpression":
      case "yaml":
      case "html":
        return;
      case "heading": {
        if (node.depth < MIN_HEADING_DEPTH) return;

        const title = textOf(node).trim();
        const slug = uniqueSlug(
          slugify(title) || `section-${headings.length + 1}`,
          taken,
        );

        node.data ??= {};
        node.data.hProperties = { ...node.data.hProperties, id: slug };

        minDepth = Math.min(minDepth, node.depth);
        headings.push({ title, slug, level: node.depth });
        break;
      }
    }

    if ("children" in node) node.children.forEach(walk);
  };

  walk(tree);

  for (const heading of headings) {
    heading.level = heading.level === minDepth ? 0 : 1;
  }

  return {
    headings,
    readTimeMinutes: Math.max(
      1,
      Math.round(
        words / PROSE_WORDS_PER_MINUTE + codeLines / CODE_LINES_PER_MINUTE,
      ),
    ),
  };
}

function toEstree(value) {
  if (value === null || typeof value !== "object") {
    return { type: "Literal", value };
  }
  if (Array.isArray(value)) {
    return { type: "ArrayExpression", elements: value.map(toEstree) };
  }
  return {
    type: "ObjectExpression",
    properties: Object.entries(value).map(([key, item]) => ({
      type: "Property",
      kind: "init",
      method: false,
      shorthand: false,
      computed: false,
      key: { type: "Identifier", name: key },
      value: toEstree(item),
    })),
  };
}

const remarkArticleMeta = () => {
  return (tree) => {
    const meta = collect(tree);

    tree.children.push({
      type: "mdxjsEsm",
      value: `export const articleMeta = ${JSON.stringify(meta)};`,
      data: {
        estree: {
          type: "Program",
          sourceType: "module",
          body: [
            {
              type: "ExportNamedDeclaration",
              specifiers: [],
              attributes: [],
              source: null,
              declaration: {
                type: "VariableDeclaration",
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    id: { type: "Identifier", name: "articleMeta" },
                    init: toEstree(meta),
                  },
                ],
              },
            },
          ],
        },
      },
    });
  };
};

export default remarkArticleMeta;
