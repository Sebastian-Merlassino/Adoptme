import winston from "winston";

// Definición de niveles de log personalizados (compatibles con Winston)
const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
};

// Formato base para los logs
const baseFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
        ({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
);

// Logger para entorno de desarrollo
const devLogger = winston.createLogger({
    levels: customLevels.levels,
    level: "debug",
    format: baseFormat,
    transports: [new winston.transports.Console()],
});

// Logger para entorno de producción
const prodLogger = winston.createLogger({
    levels: customLevels.levels,
    level: "info",
    format: baseFormat,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "errors.log",
            level: "error",
        }),
    ],
});

export const logger = process.env.NODE_ENV === "production" ? prodLogger : devLogger;
