import { NextFunction, Response } from 'express';
import { Transaction } from 'sequelize';

import { UserActionEnum } from '../../constants';
import { IUserModel, transactionWrapper } from '../../database';
import { tokenizer } from '../../helpers';
import { IRequestExtended } from '../../models';
import { oauthService } from '../../services/oauth';

class AuthController {

    loginUser = (req: IRequestExtended, res: Response, next: NextFunction) => {
        return transactionWrapper(this._loginUser);
    }

    private async _loginUser(req: IRequestExtended, res: Response, next: NextFunction, transaction: Transaction) {
        const { id } = req.user as IUserModel;
        const tokens = tokenizer(UserActionEnum.AUTH);

        await oauthService.createOauthToke({
                ...tokens,
                user_id: id
            },
            transaction
        );

        res.json({
            data: tokens
        });
    }
}

export const authController = new AuthController();
