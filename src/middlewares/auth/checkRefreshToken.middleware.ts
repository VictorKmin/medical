import { NextFunction, Response } from 'express';
import { VerifyErrors } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';

import { config } from '../../configs';
import { ResponseStatusCodesEnum } from '../../constants';
import { IUser } from '../../database';
import { ErrorHandler, errors } from '../../errors';
import { IRequestExtended } from '../../models';
import { oauthService } from '../../services';

export const checkRefreshTokenMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    const token = req.get('Authorization') as string;

    if (!token) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, 'No token'));
    }

    jwt.verify(token, config.JWT_REFRESH_SECRET, (err: VerifyErrors) => {
        if (err) {
            return next(new ErrorHandler(ResponseStatusCodesEnum.UNAUTHORIZED, 'Invalid token'));
        }
    });

    const user: IUser = await oauthService.getUserFromRefreshToken(token);

    if (!user) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.UNAUTHORIZED, errors.NOT_FOUND_USER_NOT_PRESENT.message));
    }

    req.user = user;

    next();
};
