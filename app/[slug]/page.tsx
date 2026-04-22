import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllPoemRouteSlugs,
  getPoemByRouteSlug,
} from "@/lib/poems";
import PoemClient from "@/components/PoemClient";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const poem = getPoemByRouteSlug(params.slug);

  if (!poem) {
    return {};
  }

  return {
    title: `${poem.title} | Wingflow's Poems`,
    description: `Read the poem "${poem.title}" by Wingflow.`,
  };
}

export function generateStaticParams() {
  return getAllPoemRouteSlugs().map((slug) => ({ slug }));
}

export default async function Poem({ params }: Props) {
  const { slug } = await params;
  const poem = getPoemByRouteSlug(slug);

  if (!poem) {
    return notFound();
  }

  return (
    <PoemClient
      title={poem.title}
      blocks={poem.content.split(/\r?\n\r?\n/)}
    />
  );
}
