"use client";

import clsx from "clsx";

interface DiffLine {
  type: "add" | "remove" | "context";
  content: string;
  lineNum: number;
}

const diffLines: DiffLine[] = [
  {
    type: "context",
    lineNum: 41,
    content: "export async function validateToken(token: string) {",
  },
  {
    type: "context",
    lineNum: 42,
    content: "  const payload = await verifyJwt(token);",
  },
  {
    type: "remove",
    lineNum: 43,
    content: "  if (!payload.verified) throw new AuthError();",
  },
  {
    type: "add",
    lineNum: 44,
    content: "  if (!payload.sub) throw new AuthError();",
  },
  {
    type: "context",
    lineNum: 45,
    content: "  return payload;",
  },
  {
    type: "context",
    lineNum: 46,
    content: "}",
  },
  {
    type: "context",
    lineNum: 47,
    content: "",
  },
  {
    type: "context",
    lineNum: 48,
    content: "export function getUserContext(req: Request) {",
  },
  {
    type: "remove",
    lineNum: 49,
    content: "  return req.context.user;",
  },
  {
    type: "add",
    lineNum: 50,
    content: "  return req.context.session ?? req.context.user;",
  },
  {
    type: "context",
    lineNum: 51,
    content: "}",
  },
];

export function PRDiffPanel({ filename = "auth.middleware.ts" }: { filename?: string }) {
  return (
    <div className="rounded-md bg-bg-base hairline overflow-hidden font-mono text-[12px] sm:text-[13px]">
      <div className="flex items-center justify-between px-4 py-2.5 hairline-b">
        <span className="text-ink-secondary">{filename}</span>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-status-safe">+2</span>
          <span className="text-status-critical">-2</span>
        </div>
      </div>
      <pre className="overflow-x-auto py-2">
        <code>
          {diffLines.map((line) => (
            <div
              key={line.lineNum}
              className={clsx(
                "flex items-start px-4 py-0.5",
                line.type === "add" && "diff-add",
                line.type === "remove" && "diff-remove",
                line.type === "context" && "diff-context"
              )}
            >
              <span className="inline-block w-8 text-right pr-3 text-ink-tertiary select-none">
                {line.lineNum}
              </span>
              <span
                className={clsx(
                  "inline-block w-4 select-none",
                  line.type === "add" && "text-status-safe",
                  line.type === "remove" && "text-status-critical",
                  line.type === "context" && "text-ink-tertiary"
                )}
              >
                {line.type === "add" ? "+" : line.type === "remove" ? "-" : " "}
              </span>
              <span
                className={clsx(
                  line.type === "add" && "text-ink-primary",
                  line.type === "remove" && "text-ink-secondary",
                  line.type === "context" && "text-ink-secondary"
                )}
              >
                {line.content}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}