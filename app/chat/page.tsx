"use server";

import ChatRoom from "@/components/component/chat";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const value = token?.value;

  if (!token?.value) {
    redirect("/");
  }

  return <ChatRoom token={value ? value.toString() : undefined} />;
}
