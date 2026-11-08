import Link from "next/link";
import { StatusPanel } from "@/components/status-panel";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <StatusPanel
      eyebrow="404"
      title="Page not found"
      description="The page you are looking for does not exist or has moved."
      action={
        <Button asChild>
          <Link href="/">Back home</Link>
        </Button>
      }
    />
  );
}
