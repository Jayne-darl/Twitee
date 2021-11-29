import { Router } from 'express';
import twitRouter from './resources/twit/twit.router';
import userRouter from './resources/user/user.router';

const testRouter = Router();

testRouter.all('/', (_, res) => res.json({ message: 'Welcome to Twitee' }));

const appRouter = [testRouter, userRouter, twitRouter];

export default appRouter;
