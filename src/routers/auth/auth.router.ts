import { Router } from 'express';

import { authController } from '../../controllers';
import { checkIsPasswordCorrect, checkIsUserBlocked, checkIsUserRegistered } from '../../middlewares';

const router = Router();

router.post(
    '/',
    checkIsUserRegistered,
    checkIsUserBlocked,
    checkIsPasswordCorrect,
    authController.loginUser
);


export const authRouter = router;
