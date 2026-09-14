"use client"; // dynamicするため

import dynamic from "next/dynamic";
import { type Oshi } from "@/lib/types";

const OshiListView = dynamic(
  () => import("@/components/OshiList").then((m) => m.OshiListView),
  { ssr: false }
);

export function OshiListDynamic({ oshiList }: { oshiList: Oshi[] }) {
  return <OshiListView oshiList={oshiList} />;
}
