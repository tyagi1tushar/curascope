import { env } from "./core/config/env";
import { logger } from "./core/logger/logger";
import { startTelemetry } from "./core/telemetry";
import { connectDatabase } from "./core/database";

async function bootstrap() {
  try {
    await startTelemetry();

    const { default: app } = await import("./app");

    await connectDatabase();

    app.listen(env.PORT, () => {
      logger.info(
        `🚀 ${env.APP_NAME} running on http://localhost:${env.PORT}`
      );
    });
  } catch (error) {
    logger.error(error, "Failed to bootstrap application");
    process.exit(1);
  }
}

bootstrap();