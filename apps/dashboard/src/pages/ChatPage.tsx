import { useState } from "react";
import axios from "axios";
import { PromptForm } from "../components/chat/PromptForm";
import { ResponseCard } from "../components/chat/ResponseCard";
import { useMutation } from "@tanstack/react-query";
import { ChatApi, type GenerateResponse } from "../api/chat";
import { SessionDrawer } from "../components/sessions/SessionDrawer";

interface ChatApiError {
    success?: boolean;
    code?: string;
    message?: string;
    security?: {
        score: number;
        risk: "low" | "medium" | "high";
        findings: string[];
    };
}

export function ChatPage() {
    const [provider, setProvider] = useState("groq");
    const [model, setModel] = useState("openai/gpt-oss-20b");
    const [prompt, setPrompt] = useState("");
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
    const [response, setResponse] = useState<GenerateResponse | null>(null);
    const [requestError, setRequestError] = useState<ChatApiError | null>(null);

    const mutation = useMutation({
        mutationFn: ChatApi.generate,

        onMutate() {
            setRequestError(null);
            setResponse(null);
        },

        onSuccess(data) {
            setResponse(data);
            setRequestError(null);
        },

        onError(error) {
            console.error("AI request failed:", error);

            if (axios.isAxiosError<ChatApiError>(error)) {
                setRequestError(
                    error.response?.data ?? {
                        message: error.response
                            ? `Request failed with status ${error.response.status}.`
                            : "Unable to reach the CuraScope server. Check that the backend is running and try again.",
                    }
                );
            } else {
                setRequestError({
                    message: "An unexpected error occurred. Please try again.",
                });
            }
        },
    });

    const handleSubmit = () => {
        setRequestError(null);
        mutation.mutate({ provider, model, prompt });
    };

    return (
        <main className="min-h-screen bg-[#0B1020] text-white">
            <div className="mx-auto max-w-7xl px-8 py-10">
                <div className="mb-12">
                    <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-s font-medium text-cyan-200">
                        AI Gateway
                    </span>

                    <h1 className="mt-5 text-5xl items-center justify-center text-blue-100 font-bold tracking-tight">
                        AI Playground
                    </h1>

                    <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
                        Send prompts through the CuraScope AI Gateway. Every request is
                        secured, traced with OpenTelemetry, stored as a session and available
                        in SigNoz.
                    </p>
                </div>

                <div className="mt-10 grid items-start gap-8 lg:grid-cols-[420px_1fr]">
                    <PromptForm
                        provider={provider}
                        model={model}
                        prompt={prompt}
                        loading={mutation.isPending}
                        onProviderChange={setProvider}
                        onModelChange={setModel}
                        onPromptChange={setPrompt}
                        onSubmit={handleSubmit}
                    />

                    <div className="space-y-4">
                        {requestError && (
                            <section
                                role="alert"
                                className={`rounded-xl border p-5 ${requestError.code === "PROMPT_SECURITY_REJECTED"
                                        ? "border-amber-500/40 bg-amber-500/10"
                                        : "border-red-500/40 bg-red-500/10"
                                    }`}
                            >
                                <h2 className="font-semibold">
                                    {requestError.code === "PROMPT_SECURITY_REJECTED"
                                        ? "Request blocked by security policy"
                                        : "Request failed"}
                                </h2>

                                <p className="mt-2 text-sm text-slate-200">
                                    {requestError.code === "PROMPT_SECURITY_REJECTED"
                                        ? "CuraScope rejected this prompt before sending it to the AI provider."
                                        : requestError.message ?? "The request could not be completed."}
                                </p>

                                {requestError.code === "PROMPT_SECURITY_REJECTED" &&
                                    requestError.security && (
                                        <div className="mt-3 text-sm text-slate-300">
                                            <p>
                                                Risk:{" "}
                                                <span className="font-semibold uppercase">
                                                    {requestError.security.risk}
                                                </span>
                                                {" · "}Score: {requestError.security.score}
                                            </p>

                                            {requestError.security.findings.length > 0 && (
                                                <ul className="mt-2 list-inside list-disc">
                                                    {requestError.security.findings.map(
                                                        (finding) => (
                                                            <li key={finding}>{finding}</li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                            </section>
                        )}

                        <ResponseCard
                            response={response}
                            onViewSession={setSelectedSessionId}
                        />
                    </div>
                </div>
            </div>

            <SessionDrawer
                sessionId={selectedSessionId}
                onClose={() => setSelectedSessionId(null)}
            />
        </main>
    );


}
