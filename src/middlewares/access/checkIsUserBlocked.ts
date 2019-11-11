import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum, UserStatusEnum } from '../../constants';
import { IUserModel } from '../../database';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended } from '../../models';

export const checkIsUserBlocked = (req: IRequestExtended, res: Response, next: NextFunction) => {
    const { status_id } = req.user as IUserModel;

    if (status_id === UserStatusEnum.BLOCKED) {
        return next(
            new ErrorHandler(
                ResponseStatusCodesEnum.FORBIDDEN,
                errors.FORBIDDEN_USER_BLOCKED.message,
                errors.FORBIDDEN_USER_BLOCKED.code
            ));
    }

    next();
};
