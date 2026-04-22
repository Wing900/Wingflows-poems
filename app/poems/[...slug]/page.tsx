import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PoemArticle from "@/components/PoemArticle";
import { getAllPoems, getPoemBySlug } from "@/lib/poems";

export function generateStaticParams() {
  return getAllPoems().map((poem) => ({
    slug: poem.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const poem = getPoemBySlug(slug);

  if (!poem) {
    return {};
  }

  return {
    title: `${poem.title} | Wingflow's Poems`,
    description: `${poem.title} from the ${poem.category} collection.`,
  };
}

export default async function PoemPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const poem = getPoemBySlug(slug);

  if (!poem) {
    notFound();
  }

  return <PoemArticle poem={poem} />;
}
