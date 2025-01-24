import { AuthForms } from "@/components/component/auth";
import { ServerStartupAlert } from "@/components/component/serverWakeUp";
import { ThemeToggle } from "@/components/component/theme-toggle";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <AuthForms />
      <Toaster />
    </>
  );
}
