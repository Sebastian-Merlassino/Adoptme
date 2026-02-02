import { AppError } from "../utils/errors.js";

export const errorHandler = (err, req, res, next) => {
  const isAppError = err instanceof AppError;

  res.status(isAppError ? err.statusCode : 500).json({
    status: "error",
    code: isAppError ? err.code : "INTERNAL_ERROR",
    message: err.message || "Error interno",
    cause: isAppError ? err.cause : null,
  });
};
