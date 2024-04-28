import React, { useState } from "react";
import { Socket } from "socket.io-client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

type Props = {
  isConnected: boolean;
  socketId: string;
  socket: Socket;
};

export default function Form({ isConnected, socketId, socket }: Props) {
  const { toast } = useToast();
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isConnected)
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "You are not connected to the server. Please try again.",
      });

    socket.emit("message-from-client", {
      id: socketId,
      message,
    });
    setMessage("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <form className="border-t dark:border-gray-700 p-4" onSubmit={handleSubmit}>
      <div className="flex items-center gap-2">
        <Input
          className="flex-1 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent dark:focus:ring-gray-50"
          placeholder="Type your message..."
          type="text"
          value={message}
          onChange={handleChange}
        />
        <Button
          className="px-4 py-2 rounded-md text-sm font-medium"
          variant="default"
          type="submit"
        >
          Send
        </Button>
      </div>
    </form>
  );
}
