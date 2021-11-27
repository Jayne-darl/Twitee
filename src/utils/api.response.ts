import { Response } from 'express';

// Response object is not globally available so, the need to get if from each request handler
type Data = {
  response: Response;
  statusCode?: number;
  message?: string;
  data?: any;
};

export const requestResponse = ({
  response,
  statusCode = 500,
  message = 'Internal Server Error. Please try again or contact Support',
  data,
}: Data) =>
  response.status(statusCode).json({
    message,
    ...(data && { data }),
  });
