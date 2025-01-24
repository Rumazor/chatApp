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

  try {
    const response = await fetch(
      "https://nestjs-practice-supabase-prisma.onrender.com/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      if (response.status === 504) {
        return ["Server is probably waking up. Please try again in a minute."];
      }
      const errorData = await response.json();
      return errorData.message || ["Unknown error"];
    }

    const dataResponse = await response.json();
    if (dataResponse.error) {
      return dataResponse.message;
    }

    if (dataResponse.token) {
      cookies().set("token", dataResponse.token);
    }

    return null;
  } catch (error) {
    return ["Network error. Please check your connection and try again."];
  }
}

export async function login(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // supabase auth
  // const response = await supabase.auth.signInWithPassword(data)
  // http://localhost:3001/auth/login
  const response = await fetch(
    "https://nestjs-practice-supabase-prisma.onrender.com/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const dataResponse = await response.json();
  if (dataResponse.error) {
    return dataResponse.message;
  }

  if (dataResponse.token) {
    cookies().set("token", dataResponse.token);
    revalidatePath("/", "layout");
    redirect("/chat");
  }

  // if (error) {
  //   redirect("/error");
  // }

  // redirect("/chat");
}

export async function logout() {
  cookies().delete("token");
  redirect("/");
}
