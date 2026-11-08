import Link from "next/link";
import { ArrowRight, Boxes, Code2, FlaskConical, ShieldCheck, Sparkles } from "lucide-react";
import { ApiStatus } from "@/components/api-status";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

const features = [
  {
    icon: Boxes,
    title: "Strict TypeScript",
    description: "Strict compiler options, generated route types, and typed environment variables.",
  },
  {
    icon: FlaskConical,
    title: "Tested end to end",
    description: "Vitest, React Testing Library, Playwright, and axe accessibility checks.",
  },
  {
    icon: ShieldCheck,
    title: "Protected main",
    description: "Pull requests, required CI checks, CodeQL, and a squash-only history.",
  },
  {
    icon: Sparkles,
    title: "Themeable UI",
    description:
      "Tailwind CSS v4 tokens, shadcn/ui primitives, and a light, dark, or system theme.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-xs text-primary-foreground">
              C
            </span>
            {siteConfig.name}
          </Link>
          <div className="flex items-center gap-1">
            <Button asChild variant="ghost" size="sm">
              <Link href="https://github.com/sopwise-ai/cikuku" target="_blank" rel="noreferrer">
                <Code2 className="size-4" />
                GitHub
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-16 px-6 py-20">
        <section className="flex flex-col items-start gap-6">
          <Badge variant="secondary">Next.js 16 · App Router</Badge>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            A production-ready starter for modern web apps
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">{siteConfig.description}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="https://nextjs.org/docs" target="_blank" rel="noreferrer">
                Read the docs
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="https://github.com/sopwise-ai/cikuku" target="_blank" rel="noreferrer">
                View source
              </Link>
            </Button>
          </div>
        </section>

        <section aria-labelledby="features-heading" className="flex flex-col gap-6">
          <h2 id="features-heading" className="text-2xl font-semibold tracking-tight">
            Everything wired up
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardHeader>
                  <Icon className="size-5 text-muted-foreground" aria-hidden="true" />
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Built with Next.js, Tailwind CSS, and shadcn/ui.</p>
          <div className="flex items-center gap-4">
            <ApiStatus />
            <Link href="/sitemap.xml" className="hover:text-foreground">
              Sitemap
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
