import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError,
} from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import AppError from "../error/appError";
import config from "../config";
import { getCachedData } from "../utils/cashData";
import prisma from "../config/prismaClient";

export const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    try {
      const decoded = jwt.verify(token, config.jwt_access_secret as string);

      console.log("decoded", decoded);

      const { id, role } = decoded as JwtPayload;

      // const cachedToken = await getCachedData(
      //   `sparkle-car-service:user:${email}:token`
      // );

      // if (cachedToken !== token) {
      //   throw new AppError(httpStatus.UNAUTHORIZED, "Token is not valid");
      // }

      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You have no access to this route"
        );
      }

      req.user = decoded as JwtPayload;
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "Your session has expired. Please login again."
        );
      } else if (error instanceof JsonWebTokenError) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "Invalid token. Please login again."
        );
      }
      throw error;
    }
  });
};
