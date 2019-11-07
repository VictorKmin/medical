import { NextFunction, Response } from 'express';
import { verify, VerifyErrors } from 'jsonwebtoken';

import { config } from '../../configs';
import { ResponseStatusCodesEnum } from '../../constants';
import { IUser } from '../../database';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended } from '../../models';
import { oauthService } from '../../services';

export const checkAccessTokenMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    const authToken = req.get('Authorization') as string;

    if (!authToken) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, 'No token'));
    }

    verify(authToken, config.JWT_SECRET, (err: VerifyErrors) => {
        if (err) {
            return next(new ErrorHandler(ResponseStatusCodesEnum.UNAUTHORIZED, 'Invalid token'));
        }
    });

    const user: IUser = await oauthService.getUserFromAccessToken(authToken);

    if (!user) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.UNAUTHORIZED, errors.NOT_FOUND_USER_NOT_PRESENT.message));
    }

    req.user = user;

    next();
};
