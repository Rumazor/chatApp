"use client";
import React, { useState } from "react";
import { CardTitle, CardHeader, CardFooter, Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { register } from "./request";
import { useToast } from "@/components/ui/use-toast";

export default function Register() {
  const { toast } = useToast();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hola");

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const error = await register(formData);

    if (!error) {
      toast({
        title: "Account created",
        description: "Your account has been created successfully",
      });
    }
    if (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div className="flex justify-center min-h-screen flex-col items-center space-y-4 dark">
      <div className="w-full max-w-sm space-y-4">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="text-2xl">Sign up</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="space-y-2">
                <Label className="text-gray-400" htmlFor="name">
                  Full name
                </Label>
                <Input required name="name" id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-400" htmlFor="new-email">
                  Email
                </Label>
                <Input
                  required
                  id="new-email"
                  name="email"
                  placeholder="m@example.com"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-400" htmlFor="new-password">
                  Password
                </Label>
                <Input
                  name="password"
                  required
                  id="new-password"
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full">Create account</Button>
              {/* <Button className="w-full" variant="outline">
          Sign up with Google
        </Button> */}
              <Link
                href="/"
                className="self-center  text-sm underline text-gray-400"
              >
                Already have an account? Sign in
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
    </div>
  );
}
