import { logger } from "../utils/logger.js";

export const loggerMiddleware = (req, res, next) => {
    req.logger = logger;

    // Loguear la información de la solicitud
    req.logger.http(`${req.method} ${req.url}`);

    next();
};
