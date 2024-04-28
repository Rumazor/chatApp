"use client";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import UserList from "./userList";
import Form from "./form";
import Messages from "./messages";
import { toast } from "../ui/use-toast";
import { connect } from "http2";

export function Chat() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [clients, setClients] = useState<string[]>([]);
  const [socketId, setSocketId] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [bearerKey, setBearerKey] = useState("");
  const [clientMessages, setClientMessages] = useState<
    { id: string; message: string; user: string }[]
  >([]);

  const connectToChat = (bearerKey: string) => {
    if (bearerKey.trim().length <= 0)
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Bearer key is required.",
      });

    const socket = io("http://localhost:3001", {
      extraHeaders: {
        authentication: bearerKey,
      },
    });
    setSocket(socket);

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    socket.on("connect", () => {
      setIsConnected(true);
      setIsLoading(false);
      if (socket.id) {
        setSocketId(socket.id);
      }
      clearTimeout(timeoutId);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    socket.on("clients-updated", (clients: string[]) => {
      setClients(clients);
    });

    socket.on(
      "message-from-server",
      ({
        message: { id, message },
        user,
      }: {
        message: { id: string; message: string };
        user: string;
      }) => {
        setClientMessages((prevMessages) => [
          ...prevMessages,
          { id, message, user },
        ]);
      }
    );
  };
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-900 dark:bg-gray-950 px-4 py-4 border-b dark:border-gray-700 flex items-center justify-between md:px-6">
        <div className="flex items-center gap-3">
          <Input
            className="bg-gray-800 text-gray-50 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent w-full md:w-64 dark:focus:ring-gray-50"
            placeholder="Paste your bearer key here"
            type="text"
            value={bearerKey}
            onChange={(e) => setBearerKey(e.target.value)}
          />
          <Button
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-50 hover:bg-gray-800 dark:hover:bg-gray-900"
            variant="outline"
            type="button"
            onClick={() => connectToChat(bearerKey)}
          >
            Connect
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Button
            className="text-gray-50 hover:bg-gray-800 dark:hover:bg-gray-900 md:hidden"
            size="icon"
            variant="ghost"
          >
            <SettingsIcon className="w-5 h-5" />
            <span className="sr-only">Settings</span>
          </Button>
          <Button
            className="text-gray-50 hover:bg-gray-800 dark:hover:bg-gray-900 md:hidden"
            size="icon"
            variant="ghost"
          >
            <SignalIcon className="w-5 h-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          {isLoading ? (
            <Badge variant="outline">
              <span className="animate-pulse">Waiting for connection...</span>
            </Badge>
          ) : isConnected ? (
            <Badge variant="default">Online</Badge>
          ) : (
            <Badge variant="destructive">Offline</Badge>
          )}
          {/* <Avatar className="h-8 w-8 md:h-10 md:w-10">
            <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar> */}
        </div>
      </header>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6 p-4 md:p-6">
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden flex flex-col">
          <Messages clientMessages={clientMessages} socketId={socketId} />
          <Form
            isConnected={isConnected}
            socketId={socketId}
            socket={socket!}
          />
        </div>
        <UserList clients={clients} />
      </div>
    </div>
  );
}

function SettingsIcon(props: any) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function SignalIcon(props: any) {
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
      <path d="M2 20h.01" />
      <path d="M7 20v-4" />
      <path d="M12 20v-8" />
      <path d="M17 20V8" />
      <path d="M22 4v16" />
    </svg>
  );
}
