import { Response } from 'express';

export const sendResponse = (
  res: Response,
  data: any,
  message: string,
  statusCode: number = 200,
  status: boolean = true,
) => {
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};
