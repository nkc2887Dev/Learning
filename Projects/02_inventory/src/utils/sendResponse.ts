import { Response } from "express";

interface SendResponseParams {
  res: Response;
  success: boolean;
  message?: string;
  data?: any;
  statusCode?: number;
}

export const sendResponse = ({
  res,
  success,
  message = "something went wrong",
  data = {},
  statusCode = 200,
}: SendResponseParams): void => {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};
