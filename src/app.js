import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import mocksRouter from "./routes/mocks.router.js";

import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./utils/logger.js";
import { loggerMiddleware } from "./middlewares/loggerMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Configuración Swagger
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "API Adoptme",
        version: "1.0.0",
        description: "API para gestión de usuarios, mascotas y adopciones",
    },
    servers: [
        {
            url: `http://localhost:${PORT}/api`,
            description: "Servidor local",
        },
    ],
};

const swaggerOptions = {
    swaggerDefinition,
    apis: ["./src/routes/users.router.js"],
};

const specs = swaggerJSDoc(swaggerOptions);

// Middleware para parsear JSON y cookies
app.use(express.json());
app.use(cookieParser());

// Middleware de logger personalizado
app.use(loggerMiddleware);

// Ruta Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));

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

// Rutas
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

// Evita levantar el servidor al correr tests
if (process.env.NODE_ENV !== "test") {
    startServer();
}

export default app;