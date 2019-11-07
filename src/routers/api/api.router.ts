import { Router } from 'express';

import { adminRouter } from '../admin';
import { userRouter } from '../user';

const router = Router();

router.use('/users', userRouter);
router.use('/admin', adminRouter);

export const apiRouter = router;
