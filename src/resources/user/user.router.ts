import { Router } from 'express';
import { ROUTES } from './routes';
import { checkIfUserExists, validateAuth } from './user.middleware';
import { UserController } from './user.controllers';

const userRouter = Router();

const { SIGNUP, SIGNIN } = ROUTES;
const { signup, signin } = UserController;

userRouter.post(SIGNUP, validateAuth, checkIfUserExists, signup);
userRouter.post(SIGNIN, validateAuth, signin);

export default userRouter;
