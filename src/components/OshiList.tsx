"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";

export type Oshi = {
  id: string;
  name: string;
  imageUrl?: string;
  description?: string;
  addedAt: string;
}

type SortKey = "kana" | "date";

export function OshiListView({ oshiList }: { oshiList: Oshi[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("date");

  const sorted = [...oshiList].sort((a, b) => {
    if (sortKey === "kana") {
      return a.name.localeCompare(b.name, "ja");
    }
    return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
  });

  return (
    <div className="min-h-screen bg-zinc-100 p-8">
      <h1 className="mb-2 text-center text-3xl font-bold text-teal-600">★ 推し一覧 ★</h1>
      <p className="mb-6 text-center text-sm text-zinc-400">推しをここに集めよう</p>

      {/* 操作バー */}
      <div className="mb-6 flex items-center justify-between">
        {/* 並べ替えボタン */}
        <div className="flex gap-2">
          <button
            onClick={() => setSortKey("date")}
            className={sortKey === "date" ? "rounded-full bg-teal-500 px-4 py-1 text-sm text-white" : "rounded-full bg-white px-4 py-1 text-sm text-zinc-400"}
          >
            追加日順
          </button>
          <button
            onClick={() => setSortKey("kana")}
            className={sortKey === "kana" ? "rounded-full bg-teal-500 px-4 py-1 text-sm text-white" : "rounded-full bg-white px-4 py-1 text-sm text-zinc-400"}
          >
            五十音順
          </button>
        </div>

        {/* 新規作成ボタン：<a> タグではなく Next.js の Link を使うことでページ全体をリロードせずに移動できる（速い）*/}
        <Link
          href="/oshi/new"
          className="rounded-full bg-amber-400 px-5 py-2 text-sm font-bold text-white hover:bg-amber-500"
        >
          ＋ 推しを登録
        </Link>
      </div>

      {/* カードグリッド */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {sorted.map((oshi) => (
          <div
            key={oshi.id}
            className="flex flex-col items-center gap-2 rounded-3xl border-2 border-zinc-200 bg-white p-5 shadow-sm"
          >
            {/* <img>（普通のHTMLタグ）
              → 画像サイズの最適化なし
              → 読み込みが遅くなる可能性がある

            <Image>（Next.js のコンポーネント）
              → 自動で画像を最適化・圧縮してくれる
              → 必要なときだけ読み込む（遅延読み込み）
              → 表示が速い*/}
            {oshi.imageUrl ? (
              <Image
                src={oshi.imageUrl}
                alt={oshi.name}
                width={96}
                height={96}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-200">
                <UserRound className="h-12 w-12 text-zinc-400" strokeWidth={1.5} />
              </div>
            )}
            <p className="font-bold text-zinc-700">{oshi.name}</p>
            <p className="text-center text-sm text-zinc-400">{oshi.description}</p>
            <span className="rounded-full bg-teal-50 px-3 py-0.5 text-xs text-teal-600">
              {oshi.addedAt} 追加
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
