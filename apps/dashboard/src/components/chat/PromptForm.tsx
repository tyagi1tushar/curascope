import { Sparkles } from "lucide-react";

interface PromptFormProps {
    prompt: string;
    provider: string;
    model: string;
    loading: boolean;
    onPromptChange: (value: string) => void;
    onProviderChange: (value: string) => void;
    onModelChange: (value: string) => void;
    onSubmit: () => void;
}

export function PromptForm({
    prompt,
    provider,
    model,
    loading,
    onPromptChange,
    onProviderChange,
    onModelChange,
    onSubmit,
}: PromptFormProps) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">
                Send AI Request
            </h2>

            <p className="mt-2 text-sm text-slate-400">
                Every request is secured, traced and stored as a session.
            </p>

            <div className="mt-6 space-y-5">

                <div>
                    <label className="mb-2 block text-sm text-slate-300">
                        Provider
                    </label>

                    <select
                        value={provider}
                        onChange={(e) => onProviderChange(e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
                    >
                        <option value="gemini">
                            Gemini
                        </option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm text-slate-300">
                        Model
                    </label>

                    <select
                        value={model}
                        onChange={(e) => onModelChange(e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
                    >
                        <option value="gemini-2.5-flash">
                            gemini-2.5-flash
                        </option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm text-slate-300">
                        Prompt
                    </label>

                    <textarea
                        rows={8}
                        value={prompt}
                        onChange={(e) => onPromptChange(e.target.value)}
                        placeholder="Ask anything..."
                        className="resize-none w-full rounded-lg border border-slate-700 bg-slate-950 p-3 outline-none focus:border-cyan-500"
                    />
                </div>

                <button
                    onClick={onSubmit}
                    disabled={loading || !prompt.trim()}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Sparkles size={18} />

                    {loading ? "Generating..." : "Generate Response"}
                </button>

            </div>
        </div>
    );
}