import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import { env } from "../config/env.js";

import routes from "./routes.js";

import { requestLogger } from "../middleware/requestLogger.js";
import { notFound } from "../middleware/notFound.js";
import { errorHandler } from "../middleware/errorHandler.js";

import uploadRoutes
    from "../modules/upload/upload.routes.js";

const app = express();

app.use(helmet());

app.use(
    cors({
        origin: env.CLIENT_URL,
        credentials: true,
    }),
);

app.use(compression());

app.use(cookieParser());

app.use(
    express.json({
        limit: "5mb",
    }),
);

app.use(
    express.urlencoded({
        extended: true,
        limit: "5mb",
    }),
);

app.use(requestLogger);

app.use("/api", routes);

app.use(
    "/api/uploads",
    uploadRoutes,
);

app.use(notFound);

app.use(errorHandler);

export default app;