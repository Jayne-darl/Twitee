import { Request, Response } from 'express';
import { requestResponse } from '../../utils/api.response';
import { User } from './user.model';
import { comparePassword, getNameFromEmail, hashPassword, newToken, sendOnboardingMail } from './user.utils';

export class UserController {
  static async signup(req: Request, response: Response) {
    try {
      const { email, password } = req.body;
      const hashedPassword = hashPassword(password);
      const name = getNameFromEmail(email);

      const res = await User.create({ name, email, password: hashedPassword });
      const data = res.toJSON();

      const token = newToken(data);
      data.token = token;

      sendOnboardingMail(email);
      return requestResponse({ response, statusCode: 201, message: 'OK', data });
    } catch (error) {
      return requestResponse({ response });
    }
  }
  static async signin(req: Request, response: Response) {
    try {
      const { email, password } = req.body;
      const res = await User.findOne({ where: { email } });
      const user = res?.toJSON();
      const match = comparePassword(user.password, password);
      if (!match) {
        return requestResponse({
          response,
          statusCode: 401,
          message: 'Invalid password',
        });
      }

      const token = newToken(user);
      return requestResponse({
        response,
        statusCode: 200,
        message: 'User successfully signed in',
        data: { user, token },
      });
    } catch (error) {
      return requestResponse({ response });
    }
  }
}
