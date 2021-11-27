import { Router } from 'express';
import userRouter from './resources/user/user.router';

const testRouter = Router();

testRouter.all('/', (_, res) => res.json({ message: 'Welcome to Twitee' }));

const appRouter = [testRouter, userRouter];

export default appRouter;
