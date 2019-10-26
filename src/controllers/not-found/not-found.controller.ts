import { Request, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';

export class NotFoundController {
    public all(req: Request, res: Response): void {
        throw new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, 'API route not found');
    }
}

export const notFoundController = new NotFoundController();
