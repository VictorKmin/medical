import { NextFunction, Request, Response } from 'express';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { userService } from '../../services';

export const checkIsEmailPresent = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const isUserPresent = await userService.getUserByParams({ email });

    if (isUserPresent) {
        return next(
            new ErrorHandler(
                ResponseStatusCodesEnum.BAD_REQUEST,
                errors.BAD_REQUEST_USER_ALREADY_EXIST.message,
                errors.BAD_REQUEST_USER_ALREADY_EXIST.code
            ));
    }

    next();
};
