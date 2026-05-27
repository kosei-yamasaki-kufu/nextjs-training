import { OshiListView } from "@/components/OshiList";
import { oshiList } from "@/lib/store";

export default function Home() {
  return <OshiListView oshiList={oshiList} />;
}
