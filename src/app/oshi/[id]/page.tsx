import fs from "fs";
import path from "path";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Oshi } from "@/lib/types";
import { OshiNews } from "@/components/OshiNews";

export default async function OshiDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const filePath = path.join(process.cwd(), "data/oshi.json");
  const oshiList: Oshi[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const oshi = oshiList.find((e) => e.id === id);

  if (!oshi) notFound();

  return (
    <div className="min-h-screen bg-zinc-100 p-8">
      <div className="mx-auto max-w-sm rounded-3xl border-2 border-zinc-200 bg-white p-8 shadow-sm">
        <Button variant="ghost" asChild className="mb-4 px-0 text-zinc-400 hover:text-teal-500">
          <Link href="/"><ArrowLeft className="h-4 w-4" />一覧に戻る</Link>
        </Button>
        <div className="flex flex-col items-center gap-4">
          {oshi.imageUrl ? (
            <Image
              src={oshi.imageUrl}
              alt={oshi.name}
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-zinc-200">
              <UserRound className="h-14 w-14 text-zinc-400" strokeWidth={1.5} />
            </div>
          )}

          <h1 className="text-2xl font-bold text-zinc-700">{oshi.name}</h1>

          {oshi.description && (
            <p className="text-center text-zinc-500">{oshi.description}</p>
          )}

          <span className="rounded-full bg-teal-50 px-4 py-1 text-sm text-teal-600">
            {new Date(oshi.addedAt).toLocaleDateString("ja-JP")} 追加
          </span>
        </div>

        <div className="mt-6">
          <h2 className="mb-3 font-bold text-zinc-600">関連ニュース</h2>
          <Suspense fallback={<p className="text-sm text-zinc-400">ニュース取得中...</p>}>
            <OshiNews name={oshi.name} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
