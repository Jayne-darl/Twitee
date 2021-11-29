import { authSchema } from './user.validation';
import { User } from './user.model';
import { requestResponse } from '../../utils/api.response';
import { NextFunction, Request, Response } from 'express';

export const validateAuth = async (req: Request, response: Response, next: NextFunction) => {
  try {
    const value = await authSchema.validateAsync(req.body);
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
export const checkIfUserExists = async (req: Request, response: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
      return requestResponse({
        response,
        statusCode: 400,
        message: 'User with email already exist',
      });
    }
    return next();
  } catch (error) {
    return requestResponse({
      response,
    });
  }
};
