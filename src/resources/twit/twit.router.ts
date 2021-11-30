import { Router } from 'express';
import { authorise_user } from '../../utils/auth';
import { ROUTES } from './routes';
import { twitController } from './twit.controllers';
import { validateCreateTwit, validateGetOneTwit } from './twit.middleware';

const twitRouter = Router();

const { TWIT, SINGLE_TWIT } = ROUTES;
const { createTwit, deleteTwit, getOneTwit } = twitController;

twitRouter.post(TWIT, validateCreateTwit, authorise_user, createTwit);
twitRouter.delete(TWIT, authorise_user, validateGetOneTwit, deleteTwit);
twitRouter.get(SINGLE_TWIT, authorise_user, getOneTwit);

export default twitRouter;
