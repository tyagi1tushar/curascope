import { Brain, Clock3, Database, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";

type Event = {
  name: string;
  timestamp: string;
};

type Props = {
  events: Event[];
};

function getEventIcon(name: string) {
  const event = name.toLowerCase();

  if (event.includes("request") || event.includes("prompt")) {
    return MessageSquare;
  }

  if (event.includes("security") || event.includes("scan")) {
    return ShieldCheck;
  }

  if (event.includes("gemini") || event.includes("model")) {
    return Sparkles;
  }

  if (event.includes("response")) {
    return Brain;
  }

  if (
    event.includes("store") ||
    event.includes("mongo") ||
    event.includes("database")
  ) {
    return Database;
  }

  return Clock3;
}

export function SessionTimeline({ events }: Props) {
  const uniqueEvents = events.filter((event, index, array) => {
    if (index === 0) return true;

    return (
      event.name !== array[index - 1].name ||
      event.timestamp !== array[index - 1].timestamp
    );
  });

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold">
          Timeline
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Execution history for this request.
        </p>
      </div>

      <div className="space-y-5">
        {uniqueEvents.map((event, index) => {
          const Icon = getEventIcon(event.name);

          return (
            <div
              key={`${event.name}-${event.timestamp}-${index}`}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/20">
                  <Icon size={18} />
                </div>

                {index !== uniqueEvents.length - 1 && (
                  <div className="mt-2 h-full w-px bg-slate-700" />
                )}
              </div>

              <div className="flex-1 pb-6">
                <p className="font-medium">
                  {event.name}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  {new Date(event.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}