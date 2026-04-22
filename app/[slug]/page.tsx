import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { getAllPoems, getPoemByPermalink } from "@/lib/poems";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const poem = getPoemByPermalink(decodeURIComponent(params.slug));

  if (!poem) {
    return {};
  }

  const title = poem.title;

  return {
    title: `${title} | Wingflow's Poems`,
    description: `Read the poem "${title}" by Wingflow.`,
  };
}

export function generateStaticParams() {
  return getAllPoems().map((poem) => ({
    slug: poem.permalink,
  }));
}

export default async function Poem({ params }: Props) {
  const { slug } = await params;
  const poem = getPoemByPermalink(decodeURIComponent(slug));

  if (!poem) {
    return notFound();
  }

  const blocks = poem.content.split(/\r?\n\r?\n/);

  return (
    <main className="min-h-[50vh] w-full bg-zinc-100/90 py-12 px-8 dark:bg-zinc-950/80">
      <article className="container prose prose-zinc mx-auto md:prose-2xl dark:prose-invert">
        <h1>{poem.title}</h1>
        <main>
          {blocks.map((block, blockIndex) => (
            <p key={`${poem.id}-${blockIndex}`}>
              {block.split(/\r?\n/).map((line, index, array) => (
                <Fragment key={`${poem.id}-${blockIndex}-${index}`}>
                  {line}
                  {index !== array.length - 1 && <br />}
                </Fragment>
              ))}
            </p>
          ))}
        </main>
      </article>
    </main>
  );
}
