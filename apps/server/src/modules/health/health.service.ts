import { env } from "../../core/config/env";

export const getHealthStatus = () => {
  return {
    success: true,
    service: env.APP_NAME,
    status: "healthy",
    environment: env.NODE_ENV,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
};