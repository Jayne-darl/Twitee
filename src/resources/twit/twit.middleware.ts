import { NextFunction, Request, Response } from 'express';
import { requestResponse } from '../../utils/api.response';
import { createTwitSchema, deleteTwitSchema } from './twit.validation';

export const validateCreateTwit = async (req: Request, response: Response, next: NextFunction) => {
  try {
    const value = await createTwitSchema.validateAsync(req.body);
    req.body = value;

    return next();
  } catch (error) {
    return requestResponse({
      response,
      statusCode: 422,
      message: error.details[0].message,
    });
  }
};
export const validateDeleteTwit = async (req: Request, response: Response, next: NextFunction) => {
  try {
    const value = await deleteTwitSchema.validateAsync(req.body);
    req.body = value;

    return next();
  } catch (error) {
    return requestResponse({
      response,
      statusCode: 422,
      message: error.details[0].message,
    });
  }
};
