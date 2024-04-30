"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function register(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    fullName: formData.get("name") as string,
  };

  const response = await fetch("https://nestjs-practice-supabase-prisma.onrender.com/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const dataResponse = await response.json();
  if (dataResponse.error) {
    return dataResponse.message;
  }

  if (dataResponse.token) {
    cookies().set("token", dataResponse.token);

    revalidatePath("/", "layout");
    redirect("/");
  }

  // if (error) {
  //   redirect("/error");
  // }

  // redirect("/chat");
}
