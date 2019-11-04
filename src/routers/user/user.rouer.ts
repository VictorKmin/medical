import { Router } from 'express';
import { checkIsUserPresent } from '../../middlewares/user';

import { userController } from '.././../controllers';

const router = Router();

router.get('/', userController.getUsers);
router.post('/', checkIsUserPresent, userController.createUser);

export const userRouter = router;
