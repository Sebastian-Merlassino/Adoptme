import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";

// Middleware de manejo de errores
import mocksRouter from "./routes/mocks.router.js";

// Middleware de manejo de errores
import { errorHandler } from "./middlewares/errorHandler.js";

// Logger
import { logger } from "./utils/logger.js";
import { loggerMiddleware } from "./middlewares/loggerMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware para parsear JSON y cookies
app.use(express.json());
app.use(cookieParser());

// Middleware de logger personalizado
app.use(loggerMiddleware);

// Ruta de prueba para el logger
app.get("/loggerTest", (req, res) => {
    req.logger.debug("Logger test - debug");
    req.logger.http("Logger test - http");
    req.logger.info("Logger test - info");
    req.logger.warning("Logger test - warning");
    req.logger.error("Logger test - error");
    req.logger.fatal("Logger test - fatal");
    res.status(200).send("Logger test OK");
});


app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/mocks", mocksRouter);

// Middleware de manejo de errores
app.use(errorHandler);

// Conexión a MongoDB y arranque del servidor
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        logger.info("MongoDB connected successfully");

        app.listen(PORT, () => {
            logger.info(`Listening on ${PORT}`);
        });
    } catch (error) {
        logger.fatal(`Startup failed: ${error.message}`);
        process.exit(1);
    }
};

startServer();
