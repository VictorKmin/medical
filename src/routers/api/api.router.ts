import { Router } from 'express';

import { userRouter } from '../user';

const router = Router();

router.use('/users', userRouter);

export const apiRouter = router;
