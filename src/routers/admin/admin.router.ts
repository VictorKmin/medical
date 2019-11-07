import { Router } from 'express';

import { adminController } from '.././../controllers';

const router = Router();

router.post('/auth', adminController.authAdmin);

export const adminRouter = router;
