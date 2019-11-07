import { NextFunction, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended } from '../../models';
import { userService } from '../../services';

export const checkIsUserExists = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    const { user_id } = req.params;
    const isUserPresent = await userService.getUserByParams({ user_id });

    if (!isUserPresent) {
        return next(
            new ErrorHandler(
                ResponseStatusCodesEnum.NOT_FOUND,
                errors.NOT_FOUND_USER_NOT_PRESENT.message,
                errors.NOT_FOUND_USER_NOT_PRESENT.code
            ));
    }

    req.user = isUserPresent;

    next();
};
