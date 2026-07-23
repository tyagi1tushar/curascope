import type { GenerateResponse } from "../../api/chat";

interface ResponseCardProps {
    response: GenerateResponse | null;
    onViewSession: (sessionId: string) => void;
}

export function ResponseCard({
    response,
    onViewSession,
}: ResponseCardProps) {
    if (!response) {
        return (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="flex items-start justify-between">

                    <div>

                        <h2 className="text-xl font-semibold">
                            Generated Response
                        </h2>

                    </div>

                </div>

                <div className="mt-6 flex h-[500px] items-center justify-center rounded-xl border border-dashed border-slate-700 text-slate-500 text-medium">
                    Ready to generate

                    Submit a prompt to see the AI response,
                    telemetry and session details.
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border space-y-8 border-slate-800 bg-slate-900 p-6">

            <h2 className="text-xl font-semibold">
                Generated Response
            </h2>

            <div className="mt-6 whitespace-pre-wrap rounded-xl bg-slate-950 p-5 leading-8 text-base">
                {response.text}
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-slate-800 pt-6">

                <div>
                    <p className="text-sm text-slate-400">
                       ✓ Session Created
                    </p>

                    <p className="mt-1 font-mono text-xs text-slate-300">
                        {response.sessionId}
                    </p>
                </div>

                <button
                    onClick={() => onViewSession(response.sessionId)}
                    className="rounded-lg bg-cyan-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-400">
                    View Session →
                </button>

            </div>
        </div>
    );
}