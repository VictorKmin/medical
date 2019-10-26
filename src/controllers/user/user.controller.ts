import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../../models';

class UserController {
    public getUsers(req: IRequestExtended, res: Response, next: NextFunction) {
        res.json('ok');
    }
}

export const userController = new UserController();
