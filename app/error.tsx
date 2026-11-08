"use client";

import { useEffect } from "react";
import { StatusPanel } from "@/components/status-panel";
import { Button } from "@/components/ui/button";

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusPanel
      title="Something went wrong"
      description="An unexpected error occurred. Try again or return to the home page."
      action={<Button onClick={retry}>Try again</Button>}
    />
  );
}
