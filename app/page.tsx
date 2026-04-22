import Author from "@/components/Author";
import LatinVelocity from "@/components/LatinVelocity";
import PoemList from "@/components/PoemList";
import { getPoems } from "@/lib/poems";

export default function HomePage() {
  const poems = getPoems();

  return (
    <main className="snap-y snap-mandatory">
      <PoemList poems={poems} />
      <Author />
      <LatinVelocity />
    </main>
  );
}
