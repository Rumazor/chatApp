import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "lucide-react";

export function ServerStartupAlert() {
  return (
    <Alert className="mb-4">
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>Slow Initial Load Expected</AlertTitle>
      <AlertDescription>
        Server is on a free tier. First request may take up to 50 seconds while
        server wakes up.
      </AlertDescription>
    </Alert>
  );
}
