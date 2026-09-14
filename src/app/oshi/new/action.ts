"use server";
import { redirect } from "next/navigation";
import fs from "fs";
import path from "path";

export async function register(formData: FormData) {
  const oshiName = formData.get("oshiName");
  const oshiImage = formData.get("oshiImage");
  const oshiDescription = formData.get("oshiDescription");

  const filePath = path.join(process.cwd(), "data/oshi.json");
  const existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const newOshi = {
    id: crypto.randomUUID(),
    name:oshiName,
    imageUrl:oshiImage,
    description:oshiDescription,
    createdAt: new Date().toISOString(),
  };

  fs.writeFileSync(filePath, JSON.stringify([...existing, newOshi], null, 2));

  redirect("/");
}
