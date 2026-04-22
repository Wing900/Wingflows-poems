import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Poem = {
  id: string;
  slug: string[];
  title: string;
  category: string;
  sourceFile: string;
  extractedOn?: string;
  content: string;
};

type RawPoemData = {
  title?: string;
  category?: string;
  source_file?: string;
  extracted_on?: string;
};

const POEMS_ROOT = path.join(process.cwd(), "poems");

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walk(fullPath);
    }
    return entry.isFile() && entry.name.endsWith(".md") ? [fullPath] : [];
  });
}

function toId(relativePath: string): string {
  return relativePath.replace(/\\/g, "/").replace(/\.md$/, "");
}

function parsePoem(filePath: string): Poem {
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const relativePath = path.relative(POEMS_ROOT, filePath);
  const normalizedPath = relativePath.replace(/\\/g, "/");
  const id = toId(normalizedPath);
  const frontmatter = data as RawPoemData;

  return {
    id,
    slug: id.split("/"),
    title: frontmatter.title ?? path.basename(filePath, ".md"),
    category: frontmatter.category ?? path.dirname(normalizedPath),
    sourceFile: frontmatter.source_file ?? "",
    extractedOn: frontmatter.extracted_on,
    content: content.trim(),
  };
}

export function getAllPoems(): Poem[] {
  return walk(POEMS_ROOT)
    .map(parsePoem)
    .sort((a, b) => a.id.localeCompare(b.id, "zh-Hans-CN"));
}

export function getPoemBySlug(slug: string[]): Poem | undefined {
  const joined = slug.join("/");
  return getAllPoems().find((poem) => poem.id === joined);
}

export function getPoemGroups(): Array<{ category: string; poems: Poem[] }> {
  const grouped = new Map<string, Poem[]>();

  for (const poem of getAllPoems()) {
    const bucket = grouped.get(poem.category) ?? [];
    bucket.push(poem);
    grouped.set(poem.category, bucket);
  }

  return [...grouped.entries()].map(([category, poems]) => ({
    category,
    poems,
  }));
}
