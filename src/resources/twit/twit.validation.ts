import Joi from 'joi';

export const createTwitSchema = Joi.object({
  content: Joi.string().required(),
  rootTwit: Joi.boolean().required(),
});

export const getOneTwitSchema = Joi.object({
  id: Joi.string().required(),
});
