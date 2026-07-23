import { useState } from "react";
import { PromptForm } from "../components/chat/PromptForm";
import { ResponseCard } from "../components/chat/ResponseCard";
import { useMutation } from "@tanstack/react-query";
import { ChatApi, type GenerateResponse } from "../api/chat";
import { SessionDrawer } from "../components/sessions/SessionDrawer";

export function ChatPage() {

    const [provider, setProvider] = useState("gemini");
    const [model, setModel] = useState("gemini-2.5-flash");
    const [prompt, setPrompt] = useState("");
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);


    const [response, setResponse] = useState<GenerateResponse | null>(null);

    const mutation = useMutation({
        mutationFn: ChatApi.generate,

        onSuccess(data) {
            setResponse(data);
        },

        onError(error) {
            console.error(error);
        },
    });

    const handleSubmit = () => {
        mutation.mutate({ provider, model, prompt, });
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

                    <ResponseCard
                        response={response}
                        onViewSession={setSelectedSessionId}
                    />

                </div>

            </div>

            <SessionDrawer
                sessionId={selectedSessionId}
                onClose={() => setSelectedSessionId(null)}
            />

        </main>
    );
}