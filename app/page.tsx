import { Chat } from "@/components/component/chat";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main>
      <Chat />
      <Toaster />
    </main>
  );
}
