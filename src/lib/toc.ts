export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function slugify(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove markdown links [text](url) -> text
    .replace(/[*_`#]/g, "") // Remove markdown formatting
    .replace(/[^\w\s-]/g, "") // Remove special characters except word chars, spaces, and hyphens
    .trim()
    .replace(/\s+/g, "-"); // Replace spaces with single hyphen
}

export function extractToc(content: string): TocItem[] {
  if (!content) return [];

  // Match only main ## Heading (H2)
  const headingRegex = /^(##)\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const rawText = match[2].trim();

    // Clean markdown styling
    const cleanText = rawText
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();

    // Strip prefix labels and manual numbers before colons/hyphens (e.g., "Act 1: ", "Step 2: ", "Part 1 - ", "1. ")
    const displayText = cleanText
      .replace(/^(?:(?:Act|Step|Part|Chapter|Section|Phase|Level|Day|Episode|Point|Scene)\s*\w*|\d+)\s*[:\.\-\)]\s*/i, "")
      .replace(/^\d+[\.\)\-]\s*/, "")
      .trim();

    const id = slugify(cleanText);

    if (id && displayText) {
      items.push({
        id,
        text: displayText,
        level: 2,
      });
    }
  }

  return items;
}
