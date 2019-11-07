import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum, UserRolesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { IRequestExtended } from '../../models';

export const checkIsAdmin = (req: IRequestExtended, res: Response, next: NextFunction) => {
    const { role_id } = req.user;

    if (role_id !== UserRolesEnum.ADMIN) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.FORBIDDEN, 'You are not admin'));
    }

    next();
};
