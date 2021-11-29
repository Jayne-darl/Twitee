import Joi from 'joi';

export const createTwitSchema = Joi.object({
  content: Joi.string().required(),
});

export const deleteTwitSchema = Joi.object({
  id: Joi.string().required(),
});
