import { Router } from 'express';
import { authorise_user } from '../../utils/auth';
import { ROUTES } from './routes';
import { twitController } from './twit.controllers';
import { validateCreateTwit, validateDeleteTwit } from './twit.middleware';

const twitRouter = Router();

const { TWIT } = ROUTES;
const { createTwit, deleteTwit } = twitController;

twitRouter.post(TWIT, validateCreateTwit, authorise_user, createTwit);
twitRouter.delete(TWIT, authorise_user, validateDeleteTwit, deleteTwit);

export default twitRouter;
