import { ErrorRequestHandler } from "express";
import handleDuplicateError from "../error/duplicateError";
import AppError, {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../error/appError";
import config from "../config";
import { TErrorSources } from "../types/error";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessages: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorSources;
  } else if (
    err instanceof AppError ||
    err instanceof NotFoundError ||
    err instanceof UnauthorizedError ||
    err instanceof ForbiddenError
  ) {
    statusCode = err?.statusCode;
    message = err.message;
    errorMessages = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorMessages = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    ...(statusCode === 404 || statusCode === 401 ? { statusCode } : null),
    message,
    ...(statusCode !== 404 && statusCode !== 401 && { errorMessages }),
    ...(statusCode !== 404 &&
      statusCode !== 401 &&
      config.node_dev === "development" && { stack: err?.stack }),
  });

  // Return nothing (implicitly returns void)
};
