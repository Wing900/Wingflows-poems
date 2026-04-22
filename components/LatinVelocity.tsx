import ScrollVelocity from "./ui/scroll-velocity";

export default function LatinVelocity() {
  const texts = ["Remember", "We still have poetry", "Wingflow"];
  return (
    <div className="py-12">
      <ScrollVelocity texts={texts} />
    </div>
  );
}
