export interface SessionQuery {
  page?: number;
  limit?: number;

  search?: string;

  provider?:
    | "gemini"
    | "openai"
    | "claude"
    | "grok"
    | "ollama"
    | "deepseek"
    | "other";

  status?: "success" | "error";

  risk?: "low" | "medium" | "high";

  sort?: string;
}