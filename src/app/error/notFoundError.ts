import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFoundErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: "Not Found",
  });
};

export default notFoundErrorHandler;
