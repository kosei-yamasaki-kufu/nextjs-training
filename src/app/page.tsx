import fs from "fs";
import path from "path";
import { OshiListDynamic } from "@/components/OshiListDynamic";
// import { oshiList } from "@/lib/store"; // storeに直書きの場合

export default async function Home() {
  const filePath = path.join(process.cwd(), "data/oshi.json");
  const oshiList = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return <OshiListDynamic oshiList={oshiList} />;
}
