import type { Instrumentation } from "next";
import { env } from "./lib/env";

export function register() {
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.NODE_ENV === "production" &&
    !env.NEXT_PUBLIC_APP_URL
  ) {
    throw new Error("NEXT_PUBLIC_APP_URL is required in production");
  }
}

export const onRequestError: Instrumentation.onRequestError = (error, request, context) => {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }

  const digest =
    typeof error === "object" && error !== null && "digest" in error
      ? String(error.digest)
      : undefined;

  console.error(
    JSON.stringify({
      level: "error",
      message: error instanceof Error ? error.message : String(error),
      digest,
      path: request.path,
      method: request.method,
      route: context.routePath,
      routerKind: context.routerKind,
    }),
  );
};
