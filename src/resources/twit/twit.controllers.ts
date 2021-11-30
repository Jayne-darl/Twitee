import { Request, Response } from 'express';
import { where } from 'sequelize/dist';
import { requestResponse } from '../../utils/api.response';
import { Twit } from './twit.model';

export class twitController {
  static async createTwit(req: Request, response: Response) {
    try {
      const res = await Twit.create({ ...req.body, createdBy: req.body.user.id });
      const twit = res.toJSON();

      return requestResponse({
        response,
        statusCode: 201,
        message: 'Twit Created',
        data: twit,
      });
    } catch (error) {
      return requestResponse({ response });
    }
  }
  static async deleteTwit(req: Request, response: Response) {
    try {
      const res = await Twit.destroy({ where: { id: req.body.id, createdBy: req.body.user.id } });
      if (!res) {
        return requestResponse({
          response,
          statusCode: 404,
          message: 'No twit found',
        });
      }

      return requestResponse({
        response,
        statusCode: 200,
        message: 'Twit deleted',
        data: res,
      });
    } catch (error) {
      return requestResponse({ response });
    }
  }
  static async getOneTwit(req: Request, response: Response) {
    try {
      const res = await Twit.findOne({ where: { id: req.params.id } });
      if (!res) {
        return requestResponse({
          response,
          statusCode: 404,
          message: 'No twit found',
        });
      }
      const twit = res.toJSON();
      return requestResponse({ response, statusCode: 200, message: 'OK', data: twit });
    } catch (error) {
      console.log('error', error);

      return requestResponse({ response });
    }
  }
}
