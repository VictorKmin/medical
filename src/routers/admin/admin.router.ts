import { Router } from 'express';
import { checkIsAdmin, checkIsUserExists } from '../../middlewares';

import { adminController } from '.././../controllers';

const router = Router();

router.post('/auth', adminController.authAdmin);

router.use(checkIsAdmin);

router.use('/users/:user_id', checkIsUserExists);
router.post('/users/:user_id/block', adminController.blockUser);
router.post('/users/:user_id/unblock', adminController.unblockUser);

export const adminRouter = router;
