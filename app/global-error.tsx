"use client";

import { useEffect } from "react";
import { StatusPanel } from "@/components/status-panel";
import { Button } from "@/components/ui/button";
import "./globals.css";

const themeScript = `
try {
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = stored === "dark" || (stored !== "light" && prefersDark);
  document.documentElement.classList.toggle("dark", dark);
} catch {}
`;

export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <StatusPanel
          title="Something went wrong"
          description="The application could not render this page. Try again."
          action={<Button onClick={retry}>Try again</Button>}
        />
      </body>
    </html>
  );
}
