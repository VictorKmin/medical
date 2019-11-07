import { NextFunction, Response } from 'express';
import { Transaction } from 'sequelize';

import { ResponseStatusCodesEnum, UserActionEnum, UserStatusEnum } from '../../constants';
import { IUserModel, transactionWrapper } from '../../database';
import { ErrorHandler, errors } from '../../errors';
import { CHECK_HASH, tokenizer } from '../../helpers';
import { IRequestExtended } from '../../models';
import { oauthService, userService } from '../../services';

class AdminController {

    authAdmin = (req: IRequestExtended, res: Response, next: NextFunction) => {
        return transactionWrapper(this._authAdmin);
    }
    blockUser = (req: IRequestExtended, res: Response, next: NextFunction) => {
        return transactionWrapper(this._blockUser);
    }
    unblockUser = (req: IRequestExtended, res: Response, next: NextFunction) => {
        return transactionWrapper(this._unblockUser);
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

    private _blockUser = async (req: IRequestExtended, res: Response, next: NextFunction, transaction: Transaction) => {
        const { status_id, id } = req.user as IUserModel;

        if (status_id === UserStatusEnum.BLOCKED) {
            throw new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, 'User is already blocked');
        }

        await userService.updateUserByParams({ status_id: UserStatusEnum.BLOCKED }, { id }, transaction);

        res.end();
    }
    private _unblockUser = async (req: IRequestExtended, res: Response, next: NextFunction, transaction: Transaction) => {
        const { status_id, id } = req.user as IUserModel;

        if (status_id === UserStatusEnum.ACTIVE) {
            throw new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, 'User is already activated');
        }

        await userService.updateUserByParams({ status_id: UserStatusEnum.ACTIVE }, { id }, transaction);

        res.end();
    }
}

export const adminController = new AdminController();
