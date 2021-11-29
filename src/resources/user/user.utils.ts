import jwt from 'jsonwebtoken';
import appConfig from '../../config';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const newToken = (user: { id: any }) =>
  jwt.sign({ id: user.id }, appConfig.secrets.jwt, {
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

// async..await is not allowed in global scope, must use a wrapper
export const sendOnboardingMail = async (userEmail: string) => {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTPUSER, // generated ethereal user
        pass: process.env.SMTPPASSWORD, // generated ethereal password
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.SMTPUSER, // sender address
      to: userEmail, // list of receivers
      subject: 'Welcome to Twitee', // Subject line
      text: 'We are glad to have you onboard. We hope you have a thrilling experience on this app.', // plain text body
      //   html: '<b>Hello world?</b>', // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  } catch (error) {
    console.log('ERROR', error);
    throw new Error(error);
  }
};
