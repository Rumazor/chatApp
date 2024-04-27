import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

export function Chat() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-900 dark:bg-gray-950 px-4 py-4 border-b dark:border-gray-700 flex items-center justify-between md:px-6">
        <div className="flex items-center gap-3">
          <Input
            className="bg-gray-800 text-gray-50 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent w-full md:w-64 dark:focus:ring-gray-50"
            placeholder="Paste your bearer key here"
            type="text"
          />
          <Button
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-50 hover:bg-gray-800 dark:hover:bg-gray-900"
            variant="outline"
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
          <Avatar className="h-8 w-8 md:h-10 md:w-10">
            <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6 p-4 md:p-6">
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="flex-1 overflow-auto p-4 space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[75%]">
                <p className="text-sm">Hey there! How's it going?</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  John Doe • 2:34 PM
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 justify-end">
              <div className="bg-gray-900 text-white rounded-lg p-3 max-w-[75%] dark:bg-gray-500">
                <p className="text-sm">Pretty good, thanks for asking!</p>
                <p className="text-xs text-gray-300 mt-1">You • 2:35 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-[75%]">
                <p className="text-sm">
                  Glad to hear it! Did you catch the game last night?
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  John Doe • 2:36 PM
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 justify-end">
              <div className="bg-gray-900 text-white rounded-lg p-3 max-w-[75%] dark:bg-gray-500">
                <p className="text-sm">No, I missed it. What happened?</p>
                <p className="text-xs text-gray-300 mt-1">You • 2:37 PM</p>
              </div>
            </div>
          </div>
          <div className="border-t dark:border-gray-700 p-4">
            <div className="flex items-center gap-2">
              <Input
                className="flex-1 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent dark:focus:ring-gray-50"
                placeholder="Type your message..."
                type="text"
              />
              <Button
                className="px-4 py-2 rounded-md text-sm font-medium"
                variant="default"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden">
          <div className="border-b dark:border-gray-700 px-4 py-3 bg-gray-900 dark:bg-gray-950">
            <h2 className="text-lg font-semibold text-gray-50">
              Connected Users
            </h2>
          </div>
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <p className="text-sm font-medium">John Doe</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <p className="text-sm font-medium">Jane Smith</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <p className="text-sm font-medium">Bob Johnson</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <p className="text-sm font-medium">Sarah Lee</p>
            </div>
          </div>
        </div>
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
