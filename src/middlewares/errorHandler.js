import { AppError } from "../utils/errors.js";
import { logger } from "../utils/logger.js";


export const errorHandler = (err, req, res, next) => {
  const isAppError = err instanceof AppError;

  
  if (isAppError) {
    logger.error(
      `${req.method} ${req.url} - ${err.message}`
    );
  } else {
    logger.fatal(
      `${req.method} ${req.url} - Unexpected error: ${err.message}`
    );
  }


  res.status(isAppError ? err.statusCode : 500).json({
    status: "error",
    code: isAppError ? err.code : "INTERNAL_ERROR",
    message: err.message || "Error interno",
    cause: isAppError ? err.cause : null,
  });
};
