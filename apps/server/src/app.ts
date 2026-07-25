import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { errorMiddleware } from "./core/middleware/error.middleware";

import routes from "./routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.get("/", (_req, res) => {
    res.status(200).json({
        name: "CuraScope API",
        status: "healthy",
        version: "1.0.0",
    });
});

app.use("/api/v1", routes);
app.use("/api/v1/dashboard", dashboardRoutes);

app.use(errorMiddleware);

export default app;