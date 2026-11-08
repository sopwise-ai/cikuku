import { useQueryClient } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { QueryProvider } from "./query-provider";

function Probe() {
  const client = useQueryClient();

  return <span>{client ? "query client ready" : "missing query client"}</span>;
}

describe("QueryProvider", () => {
  it("provides a query client", () => {
    render(
      <QueryProvider>
        <Probe />
      </QueryProvider>,
    );

    expect(screen.getByText("query client ready")).toBeInTheDocument();
  });
});
