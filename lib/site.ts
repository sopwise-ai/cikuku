import { env } from "@/lib/env";

const url = env.NEXT_PUBLIC_APP_URL;

if (process.env.NODE_ENV === "production" && !url) {
  throw new Error(
    "NEXT_PUBLIC_APP_URL is required for production builds. Copy .env.example to .env.local and set the public URL.",
  );
}

export const siteConfig = {
  name: "Cikuku",
  description: "A Next.js 16 starter with TypeScript, Tailwind CSS, and production checks.",
  url: url ?? "http://localhost:3000",
};
