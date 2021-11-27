import jwt from 'jsonwebtoken';
import appConfig from '../../config';
import bcrypt from 'bcrypt';

export const newToken = (user: { _id: any }) =>
  jwt.sign({ id: user._id }, appConfig.secrets.jwt, {
    expiresIn: appConfig.secrets.JwtExp,
    algorithm: 'HS256',
  });
export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

export const comparePassword = (hashPassword: string, password: string) => {
  return bcrypt.compareSync(password, hashPassword);
};

export const getNameFromEmail = (email: string) => email.split('@')[0];
