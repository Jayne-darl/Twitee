import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import appConfig from '../config';
import { User } from '../resources/user/user.model';
import { requestResponse } from './api.response';

export const verifyToken = async (token: string) => {
  try {
    const value = jwt.verify(token, appConfig.secrets.jwt, {
      algorithms: ['HS256'],
    });

    return value;
  } catch (error) {
    throw new Error(error);
  }
};

export const authorise_user = async (req: Request, response: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return requestResponse({
      response,
      statusCode: 401,
      message: 'Unauthorised',
    });
  }

  const token = bearer.split('Bearer ')[1].trim();
  let payload: any;
  try {
    payload = await verifyToken(token);

    const user = await User.findOne({ where: { id: payload.id } });

    if (!user) {
      return requestResponse({
        response,
        statusCode: 404,
        message: 'User not found',
      });
    }
    req.body.user = user;
    return next();
  } catch (e) {
    console.log('error', e);
    return requestResponse({ response, statusCode: 401, message: 'Invalid token' });
  }
};
