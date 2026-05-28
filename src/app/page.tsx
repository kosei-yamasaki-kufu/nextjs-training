import { OshiListDynamic } from "@/components/OshiListDynamic";
import { oshiList } from "@/lib/store";

export default function Home() {
  return <OshiListDynamic oshiList={oshiList} />;
}
