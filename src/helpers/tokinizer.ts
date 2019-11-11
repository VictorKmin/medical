import * as jwt from 'jsonwebtoken';

import { config } from '../configs';
import { ResponseStatusCodesEnum, UserActionEnum } from '../constants';
import { ErrorHandler } from '../errors';

export const tokenizer = (method: number): any => {
    let secretWord = '';
    let expiresTime: string | number = config.REFRESH_TOKEN_LIFETIME;

    switch (method) {
        case UserActionEnum.AUTH:
            const accessToken = jwt.sign({}, config.JWT_SECRET, { expiresIn: config.ACCESS_TOKEN_LIFETIME });
            const refreshToken = jwt.sign({}, config.JWT_REFRESH_SECRET, { expiresIn: expiresTime });

            return { accessToken, refreshToken };
        case UserActionEnum.CONFIRM_EMAIL:
            secretWord = config.JWT_CONFIRM_EMAIL_SECRET;
            expiresTime = config.JWT_CONFIRM_EMAIL_LIFETIME;
            break;
        case UserActionEnum.RESET_PASS:
            secretWord = config.JWT_PASS_RESET_SECRET;
            expiresTime = config.JWT_PASS_RESET_LIFETIME;
            break;
        default:
            throw new ErrorHandler(ResponseStatusCodesEnum.SERVER_ERROR, 'Wrong action type' );
    }

    return jwt.sign({}, secretWord, { expiresIn: expiresTime });
};
