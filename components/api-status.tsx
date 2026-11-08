"use client";

import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const healthSchema = z.object({
  status: z.literal("ok"),
});

async function fetchHealth() {
  const response = await fetch("/api/health", { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Health check failed");
  }

  return healthSchema.parse(await response.json());
}

export function ApiStatus() {
  const { status } = useQuery({
    queryKey: ["health"],
    queryFn: fetchHealth,
    retry: false,
  });

  const label =
    status === "success" ? "API healthy" : status === "error" ? "API unavailable" : "Checking API";
  const dot =
    status === "success"
      ? "bg-emerald-500"
      : status === "error"
        ? "bg-destructive"
        : "bg-muted-foreground";

  return (
    <span role="status" className="inline-flex items-center gap-1.5">
      <span aria-hidden="true" className={`size-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}
