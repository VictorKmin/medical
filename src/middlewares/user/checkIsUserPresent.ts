import { Request, Response, NextFunction } from 'express';
import { ResponseStatusCodesEnum } from '../../constants';

import { errors, ErrorHandler } from '../../errors';
import { userService } from '../../services';

export const checkIsUserPresent = async (req: Request, res: Response, next: NextFunction) => {
    const {email} = req.body;
    const isUserPresent = await userService.getUserByParams({email});


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
