export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading page"
      className="flex min-h-screen flex-col items-center justify-center gap-4 p-8"
    >
      <div className="h-8 w-64 max-w-full animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-4 w-96 max-w-full animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-4 w-80 max-w-full animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
    </main>
  );
}
