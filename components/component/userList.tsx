import React from "react";
import { Socket } from "socket.io-client";

interface ComponentProps {
  clients: string[];
}

export default function UserList({ clients }: ComponentProps) {
  const UserConnected = () => {
    return (
      <div>
        {clients?.map((client, index) => {
          return (
            <div key={index} className="flex items-center gap-2">
              <UserIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-800 dark:text-gray-200">{client}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden">
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden">
        <div className="border-b dark:border-gray-700 px-4 py-3 bg-gray-900 dark:bg-gray-950">
          <h2 className="text-lg font-semibold text-gray-50">
            Connected Users
          </h2>
        </div>
        <div className="p-4 space-y-2">
          <UserConnected />
        </div>
      </div>
    </div>
  );
}

function UserIcon(props: any) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
