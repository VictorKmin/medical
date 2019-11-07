import { Router } from 'express';

import { checkIsEmailPresent } from '../../middlewares';
import { userController } from '.././../controllers';

const router = Router();

router.get('/', userController.getUsers);
router.post('/', checkIsEmailPresent, userController.createUser);

export const userRouter = router;
