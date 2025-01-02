import jwt from "jsonwebtoken";
import config from "../config";

export const generateToken = (id: number, role: string, email: string) => {
  return jwt.sign({ id, role, email }, config.jwt_access_secret as string, {
    expiresIn: "30d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwt_access_secret as string);
};
