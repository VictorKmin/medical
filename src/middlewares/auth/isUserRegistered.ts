import { NextFunction, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended } from '../../models';
import { userService } from '../../services';
import { emailValidator } from '../../validators';

export const checkIsUserRegistered = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    const {email} = req.body;

    const isEmailValid = Joi.validate(email, emailValidator);

    if (isEmailValid.error) {
        throw new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, isEmailValid.error.details[0].message);
    }

    const user = await userService.getUserByParams({email});

    if (!user) {
        return next(
            new ErrorHandler(
                ResponseStatusCodesEnum.NOT_FOUND,
                errors.NOT_FOUND_USER_NOT_PRESENT.message,
                errors.NOT_FOUND_USER_NOT_PRESENT.code
            ));
    }

    req.user = user;

    next()
};
