import { Login } from "@/app/login/login";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main>
      <Login />
      <Toaster />
    </main>
  );
}
