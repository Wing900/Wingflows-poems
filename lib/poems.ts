import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Poem = {
  id: string;
  slug: string;
  routeSlug: string;
  permalink: string;
  title: string;
  category: string;
  sourceFile: string;
  extractedOn?: string;
  content: string;
  writtenAt: Date;
};

type RawPoemData = {
  title?: string;
  category?: string;
  source_file?: string;
  extracted_on?: string;
};

const POEMS_ROOT = path.join(process.cwd(), "poems");
const SOURCE_ROOT = process.cwd();

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

function toSlug(relativePath: string): string {
  return relativePath.replace(/[\/\\]/g, "-").replace(/\.md$/, "");
}

export function normalizePoemSlug(value: string): string {
  return decodeURIComponent(value).replace(/^\/+|\/+$/g, "");
}

function toRouteSlug(slug: string): string {
  return Buffer.from(slug, "utf8").toString("base64url");
}

function sanitizePathSegment(value: string): string {
  return value
    .replace(/[<>:"/\\|?*]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getWrittenAt(sourceFile: string, filePath: string): Date {
  if (sourceFile) {
    const sourcePath = path.join(SOURCE_ROOT, sourceFile);
    if (fs.existsSync(sourcePath)) {
      return fs.statSync(sourcePath).mtime;
    }
  }

  return fs.statSync(filePath).mtime;
}

function parsePoem(filePath: string): Poem {
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const relativePath = path.relative(POEMS_ROOT, filePath);
  const normalizedPath = relativePath.replace(/\\/g, "/");
  const id = toId(normalizedPath);
  const frontmatter = data as RawPoemData;
  const sourceFile = frontmatter.source_file ?? "";
  const category = frontmatter.category ?? path.dirname(normalizedPath);

  return {
    id,
    slug: toSlug(normalizedPath),
    routeSlug: toRouteSlug(toSlug(normalizedPath)),
    title: frontmatter.title ?? path.basename(filePath, ".md"),
    category,
    sourceFile,
    extractedOn: frontmatter.extracted_on,
    content: content.trim(),
    writtenAt: getWrittenAt(sourceFile, filePath),
    permalink: sanitizePathSegment(
      `${frontmatter.title ?? path.basename(filePath, ".md")}--${category}`,
    ),
  };
}

export function getAllPoems(): Poem[] {
  return walk(POEMS_ROOT)
    .map(parsePoem)
    .sort((a, b) => {
      const timeDiff = b.writtenAt.getTime() - a.writtenAt.getTime();
      if (timeDiff !== 0) {
        return timeDiff;
      }
      return a.id.localeCompare(b.id, "zh-Hans-CN");
    });
}

export function getTopPoems(count = 10): Poem[] {
  return getAllPoems().slice(0, count);
}

export function getPoemByPermalink(permalink: string): Poem | undefined {
  return getAllPoems().find((poem) => poem.permalink === permalink);
}

export function getPoemById(id: string): Poem | undefined {
  return getAllPoems().find((poem) => poem.id === id);
}

export function getPoemBySlug(slug: string): Poem | undefined {
  const normalizedSlug = normalizePoemSlug(slug);
  return getAllPoems().find((poem) => poem.slug === normalizedSlug);
}

export function getAllPoemSlugs(): string[] {
  return getAllPoems().map((poem) => poem.slug);
}

export function getAllPoemRouteSlugs(): string[] {
  return getAllPoems().map((poem) => poem.routeSlug);
}

export function getPoemByRouteSlug(routeSlug: string): Poem | undefined {
  try {
    const decodedSlug = Buffer.from(routeSlug, "base64url").toString("utf8");
    return getPoemBySlug(decodedSlug);
  } catch {
    return undefined;
  }
}

export function getPoems(): Poem[] {
  return getAllPoems();
}

export function getPoemContent(permalink: string): string {
  return getPoemByPermalink(permalink)?.content ?? "";
}
