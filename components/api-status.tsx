"use client";

import { useQuery } from "@tanstack/react-query";

async function fetchHealth() {
  const response = await fetch("/api/health");

  if (!response.ok) {
    throw new Error("Health check failed");
  }

  return (await response.json()) as { status: string };
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
