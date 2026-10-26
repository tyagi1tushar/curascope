import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

type ApplicationError = Error & {
  statusCode?: number;
  code?: string;
  security?: {
    score: number;
    risk: "low" | "medium" | "high";
    findings: string[];
  };
};

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }


  const error = err instanceof Error
    ? err as ApplicationError
    : null;

  if (error?.code === "PROMPT_SECURITY_REJECTED") {
    return res.status(400).json({
      success: false,
      code: error.code,
      message: error.message,
      security: error.security,
    });
  }

  console.error(err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });


}
