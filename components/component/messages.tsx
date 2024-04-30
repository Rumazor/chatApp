import React from "react";

type Props = {
  clientMessages: { id: string; message: string; user: string }[];
  socketId: string;
};

export default function Messages({ clientMessages, socketId }: Props) {
  return (
    <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)] p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
      {clientMessages.map((clientMessage, index) => (
        <div
          key={index}
          className={`flex items-start gap-3 ${
            clientMessage.id === socketId ? "justify-end" : ""
          }`}
        >
          <div
            className={`${
              clientMessage.id === socketId
                ? "bg-gray-900 text-white dark:bg-gray-500"
                : "bg-gray-100 dark:bg-gray-800"
            } rounded-lg p-3 max-w-[75%]`}
          >
            <p className="text-sm">{clientMessage.message}</p>
            <p
              className={`text-xs mt-1 ${
                clientMessage.id === socketId
                  ? "text-gray-300"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {clientMessage.id === socketId ? "You" : clientMessage.user}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
