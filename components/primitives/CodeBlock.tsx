import clsx from "clsx";

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
  filename?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  children,
  language,
  filename,
  className,
  showLineNumbers = false,
}: CodeBlockProps) {
  return (
    <div
      className={clsx(
        "rounded-md bg-bg-base hairline overflow-hidden font-mono text-[12px] sm:text-[13px]",
        className
      )}
    >
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-2 hairline-b text-ink-tertiary">
          {filename ? (
            <span className="text-ink-secondary">{filename}</span>
          ) : (
            <span />
          )}
          {language && <span className="uppercase tracking-wider">{language}</span>}
        </div>
      )}
      <pre className="overflow-x-auto py-3 px-4 text-ink-secondary leading-relaxed">
        <code className={showLineNumbers ? "table w-full" : ""}>{children}</code>
      </pre>
    </div>
  );
}