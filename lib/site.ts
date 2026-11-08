import { env } from "@/lib/env";

export const siteConfig = {
  name: "Cikuku",
  description: "A Next.js 16 starter with TypeScript, Tailwind CSS, and production checks.",
  url: env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
};
