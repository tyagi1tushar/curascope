import { Copy, Check } from "lucide-react";
import { useState } from "react";

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

        <pre className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-200">
          {response}
        </pre>

      </div>

    </div>
  );
}