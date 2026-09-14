"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { register } from "./action";

export default function NewOshiPage() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  return (
    <main className="min-h-screen bg-zinc-100 p-8">
      <div className="mx-auto max-w-md rounded-3xl border-2 border-zinc-200 bg-white p-8 shadow-sm">
        {/* shadcn */}
        <Button variant="ghost" asChild className="mb-4 px-0 text-zinc-400 hover:text-teal-500">
          <Link href="/"><ArrowLeft className="h-4 w-4" />一覧に戻る</Link>
        </Button>

        <h1 className="mb-6 text-center text-2xl font-bold text-teal-600">★ 推しを登録</h1>

        <form action={register} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-bold text-zinc-600">名前</label>
            <input
              type="text"
              name="oshiName"
              value={name}
              placeholder="推しの名前を入力"
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border-2 border-zinc-200 px-4 py-2 text-sm outline-none focus:border-teal-300"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-zinc-600">画像URL</label>
            <input
              type="url"
              name="oshiImage"
              value={imageUrl}
              placeholder="https://..."
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full rounded-2xl border-2 border-zinc-200 px-4 py-2 text-sm outline-none focus:border-teal-300"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold text-zinc-600">ひとこと説明</label>
            <input
              type="text"
              name="oshiDescription"
              value={description}
              placeholder="推しへの想いを一言"
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-2xl border-2 border-zinc-200 px-4 py-2 text-sm outline-none focus:border-teal-300"
            />
          </div>

          <button
            type="submit"
            className="mt-2 rounded-full bg-amber-400 py-3 font-bold text-white hover:bg-amber-500"
          >
            登録
          </button>
        </form>
      </div>
    </main>
  );
}
