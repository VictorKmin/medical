import { NextFunction, Response } from 'express';
import { Transaction } from 'sequelize';

import { ResponseStatusCodesEnum, UserActionEnum } from '../../constants';
import { IUserModel, transactionWrapper } from '../../database';
import { ErrorHandler, errors } from '../../errors';
import { CHECK_HASH, tokenizer } from '../../helpers';
import { IRequestExtended } from '../../models';
import { oauthService } from '../../services';

class AdminController {

    authAdmin = (req: IRequestExtended, res: Response, next: NextFunction) => {
        return transactionWrapper(this._authAdmin);
    }

    private _authAdmin = async (req: IRequestExtended, res: Response, next: NextFunction, transaction: Transaction) => {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, 'Some field is empty');
        }

        const user: IUserModel = await oauthService.authAdmin(email);

        if (!user) {
            throw new ErrorHandler(
                ResponseStatusCodesEnum.UNAUTHORIZED,
                errors.UNAUTHORIZED_WRONG_CREDENTIALS.message,
                errors.UNAUTHORIZED_WRONG_CREDENTIALS.code
            );
        }

        const isCorrectPass = await CHECK_HASH(password, user.password);

        if (!isCorrectPass) {
            throw new ErrorHandler(
                ResponseStatusCodesEnum.UNAUTHORIZED,
                errors.UNAUTHORIZED_WRONG_CREDENTIALS.message,
                errors.UNAUTHORIZED_WRONG_CREDENTIALS.code
            );
        }

        const tokens = tokenizer(UserActionEnum.AUTH);

        await oauthService.createOauthToke(
            {
                user_id: user.id,
                access_token: tokens.accessToken,
                refresh_token: tokens.refreshToken
            },
            transaction
        );

        res.json({
            data: tokens
        });
    }
}

export const adminController = new AdminController();
