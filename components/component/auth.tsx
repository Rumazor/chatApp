"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { login, register } from "@/app/actions";
import { useToast } from "@/components/ui/use-toast";

export function AuthForms() {
  const { toast } = useToast();
  const [errorMessage, setErrorMessage] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<string>("login");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const error = await login(formData);
    if (error) {
      setErrorMessage(error);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const error = await register(formData);
    if (!error) {
      toast({
        title: "Account created",
        description: "Your account has been created successfully",
      });
      setActiveTab("login");
      setErrorMessage(null);
    }
    if (error) {
      setErrorMessage(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex justify-center min-h-screen flex-col items-center space-y-4"
    >
      <div className="w-full max-w-md">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Iniciar sesión</CardTitle>
                <CardDescription>
                  Ingresa tus credenciales para acceder a tu cuenta.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <form onSubmit={handleLogin}>
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-gray-400">
                      Correo electrónico
                    </Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-gray-400">
                      Contraseña
                    </Label>
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full mt-4">
                    Iniciar sesión
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Crear cuenta</CardTitle>
                <CardDescription>
                  Ingresa tus datos para crear una nueva cuenta.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <form onSubmit={handleRegister}>
                  <div className="space-y-2">
                    <Label htmlFor="register-name" className="text-gray-400">
                      Nombre completo
                    </Label>
                    <Input
                      id="register-name"
                      name="name"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-gray-400">
                      Correo electrónico
                    </Label>
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="register-password"
                      className="text-gray-400"
                    >
                      Contraseña
                    </Label>
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full mt-4">
                    Registrarse
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {errorMessage && (
        <div className="bg-transparent border normal-case border-red-500 rounded-md p-4 max-w-md text-red-400">
          <ul>
            {errorMessage.map((msg: string, index: number) => (
              <li key={index}>- {msg}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
