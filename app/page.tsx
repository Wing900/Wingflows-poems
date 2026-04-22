import PoemGroups from "@/components/PoemGroups";
import { getPoemGroups } from "@/lib/poems";

export default function HomePage() {
  return <PoemGroups groups={getPoemGroups()} />;
}
