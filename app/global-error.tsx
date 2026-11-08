"use client";

import { useEffect } from "react";
import "./globals.css";

export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
          <p className="max-w-md text-zinc-600 dark:text-zinc-400">
            The application could not render this page. Try again.
          </p>
          <button
            type="button"
            onClick={retry}
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
