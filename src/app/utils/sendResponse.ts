import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  accessToken?: string;
  refreshToken?: string;
  data?: T;
  meta?: any;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const responsePayload: any = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    meta: data.meta,
  };

  if (data.accessToken) {
    responsePayload.accessToken = data.accessToken;
  }

  res.status(data.statusCode).json(responsePayload);
};

export default sendResponse;
