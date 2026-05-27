import { OshiList, type Oshi } from "@/components/OshiList";
import { oshiList } from "@/lib/store";

export default function Home() {
  return <OshiList oshiList={oshiList} />;
}
