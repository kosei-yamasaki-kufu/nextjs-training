"use server";
import { redirect } from "next/navigation";

export async function register(formData: FormData) {
  const oshiName = formData.get("oshiName");
  console.log(oshiName);
  redirect("/");
}
