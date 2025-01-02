import jwt from "jsonwebtoken";
import config from "../config";

export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, config.jwt_access_secret as string, {
    expiresIn: "30d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwt_access_secret as string);
};
