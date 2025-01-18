"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { LogOut, Send, Users, X } from "lucide-react";
import { logout } from "@/app/actions";

interface Message {
  id: string;
  message: string;
  user: string;
  timestamp: string;
}

export default function ChatRoom({ token }: { token: string | undefined }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [clients, setClients] = useState<string[]>([]);
  const [socketId, setSocketId] = useState("");
  const [socket, setSocket] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [clientMessages, setClientMessages] = useState<Message[]>([]);
  console.log(clientMessages);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && socket) {
      socket.emit("message-from-client", {
        message: newMessage,
      });
      setNewMessage("");
    }
  };

  useEffect(() => {
    if (!token) return;

    let newSocket: any = null;

    try {
      newSocket = io("https://nestjs-practice-supabase-prisma.onrender.com", {
        extraHeaders: {
          authentication: token,
        },
      });

      setSocket(newSocket);

      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      newSocket.on("connect", () => {
        setIsConnected(true);
        setIsLoading(false);
        if (newSocket.id) {
          setSocketId(newSocket.id);
        }
        clearTimeout(timeoutId);
      });

      newSocket.on("disconnect", () => {
        setIsConnected(false);
      });

      newSocket.on("clients-updated", (updatedClients: string[]) => {
        setClients(updatedClients);
      });

      newSocket.on(
        "message-from-server",
        ({
          message: { id, message },
          user,
          timestamp,
        }: {
          message: { id: string; message: string };
          user: string;
          timestamp: string;
        }) => {
          setClientMessages((prevMessages) => [
            ...prevMessages,
            { id, message, user, timestamp },
          ]);

          const audio = new Audio("/soundNotification.mp3");
          audio.volume = 0.6;
          audio.play();
        }
      );
    } catch (error) {
      console.error("Socket connection error:", error);
      setIsLoading(false);
      setIsConnected(false);
    }

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [token]);

  const UsersList = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Connected Users</h2>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        {clients.map((client, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 mb-3 p-2 rounded hover:bg-[#1a1a1a] transition-colors"
          >
            <div className="relative">
              <Avatar className="w-8 h-8">
                <AvatarFallback>{client[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#0a0a0a]"></span>
            </div>
            <span className="text-sm truncate">{client}</span>
          </div>
        ))}
      </ScrollArea>
    </div>
  );

  const handleLogout = async () => {
    if (socket) {
      socket.disconnect();
    }
    await logout();
  };
  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] text-white">
      <div className="flex items-center justify-between p-4 border-b border-[#1a1a1a]">
        <h1 className="text-xl font-bold">Chat Room</h1>
        <div className="flex items-center gap-3">
          {isLoading ? (
            <Badge variant="outline">
              <span className="animate-pulse">Waiting for connection...</span>
            </Badge>
          ) : isConnected ? (
            <Badge variant="default">Online</Badge>
          ) : (
            <Badge variant="destructive">Offline</Badge>
          )}
          <form action={handleLogout}>
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </form>
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Toggle users sidebar"
              >
                <Users className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 sm:w-96 p-4 bg-[#0a0a0a] border-l border-[#1a1a1a]"
            >
              <UsersList />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-4">
            {clientMessages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 mb-4 ${
                  message.id === socketId
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <Avatar className="w-8 h-8 hidden sm:block">
                  <AvatarFallback>
                    {message.user[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`flex flex-col flex-1 min-w-0 max-w-[75%] ${
                    message.id === socketId ? "items-end" : ""
                  }`}
                >
                  <div
                    className={`rounded-lg p-3 ${
                      message.id === socketId ? "bg-blue-600" : "bg-[#1a1a1a]"
                    }`}
                  >
                    <span className=" font-medium text-xs truncate text-gray-300 mt-0 break-words">
                      {message.id === socketId ? "You" : message.user}
                    </span>
                    <span className="text-xs ml-1 text-gray-400 shrink-0">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <p className="text-gray-200 break-words">
                      {message.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>

          <div className="p-4 border-t border-[#1a1a1a]">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-[#1a1a1a] border-0 focus-visible:ring-1 focus-visible:ring-gray-600 text-white placeholder:text-gray-400"
                disabled={!isConnected}
              />
              <Button
                type="submit"
                size="icon"
                className="bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white shrink-0"
                disabled={!isConnected}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="w-80 border-l border-[#1a1a1a] p-4 hidden lg:block">
          <UsersList />
        </div>
      </div>
    </div>
  );
}
