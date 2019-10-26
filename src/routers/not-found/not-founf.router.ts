import { Router } from 'express';

import { notFoundController } from '../../controllers';

const router = Router();

router.all('*', notFoundController.all);

export const notFoundRouter = router;
