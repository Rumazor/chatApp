"use client";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { login } from "./request";
import { useState } from "react";

export function Login() {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const error = await login(formData);
    if (error) {
      setErrorMessage(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex justify-center min-h-screen flex-col items-center space-y-4 dark"
    >
      <div className="w-full max-w-sm space-y-4">
        {/* <div className="flex justify-center items-center space-x-2">
          <SunIcon className="w-4 h-4 text-gray-400" />
          <Toggle aria-label="Toggle dark mode" defaultChecked />
          <MoonIcon className="w-4 h-4 text-gray-400" />
        </div> */}
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="text-2xl">Login</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 pt-0">
              <div className="space-y-2">
                <Label className="text-gray-400" htmlFor="email">
                  Email
                </Label>
                <Input
                  name="email"
                  id="email"
                  placeholder="example@example.com"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-400" htmlFor="password">
                  Password
                </Label>
                <Input name="password" id="password" type="password" />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full">Sign in</Button>
              <Link
                href="/register"
                className="self-center  text-sm underline text-gray-400"
              >
                Need an account? Sign up
              </Link>
            </CardFooter>
          </Card>
        </form>
      </div>

      {errorMessage && (
        <div className="bg-transparent border  border-red-500 rounded-md p-4 max-w-sm text-red-400 ">
          {errorMessage}
        </div>
      )}
    </motion.div>
  );
}

function MoonIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function SunIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}
