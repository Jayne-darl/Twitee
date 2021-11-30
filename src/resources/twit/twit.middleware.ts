import { NextFunction, Request, Response } from 'express';
import { requestResponse } from '../../utils/api.response';
import { createTwitSchema, getOneTwitSchema } from './twit.validation';

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
export const validateGetOneTwit = async (req: Request, response: Response, next: NextFunction) => {
  try {
    const value = await getOneTwitSchema.validateAsync(req.body);
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
