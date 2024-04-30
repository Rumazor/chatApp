"use server";

import { Chat } from "@/components/component/chat";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const value = token?.value;
  return <Chat token={value ? value.toString() : undefined} />;
}
