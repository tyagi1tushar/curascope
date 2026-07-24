import { Copy, Check } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  response: string;
};

export function SessionResponse({ response }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(response);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div>

      <div className="mb-4 flex items-center justify-between">

        <h3 className="text-lg font-semibold">
          Generated Response
        </h3>

        <button
          onClick={handleCopy}
          className="rounded-lg bg-slate-800 p-2 transition hover:bg-slate-700"
        >
          {copied ? (
            <Check
              size={18}
              className="text-emerald-400"
            />
          ) : (
            <Copy size={18} />
          )}
        </button>

      </div>

      <div className="max-h-[420px] overflow-y-auto rounded-lg border border-slate-800 bg-slate-950 p-5">

        <ReactMarkdown
          components={{
            p: ({ children }) => (
              <p className="mb-4 leading-7 text-slate-200">
                {children}
              </p>
            ),
            h1: ({ children }) => (
              <h1 className="mb-4 text-2xl font-bold">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="mb-3 text-xl font-semibold">
                {children}
              </h2>
            ),
            ul: ({ children }) => (
              <ul className="mb-4 list-disc space-y-2 pl-6">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-4 list-decimal space-y-2 pl-6">
                {children}
              </ol>
            ),
            code: ({ children }) => (
              <code className="rounded bg-slate-800 px-1 py-0.5 text-cyan-300">
                {children}
              </code>
            ),
          }}
        >
          {response}
        </ReactMarkdown>

      </div>

    </div>
  );
}