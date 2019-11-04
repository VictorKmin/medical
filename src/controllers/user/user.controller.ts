import { NextFunction, Response } from 'express';
import { Transaction } from 'sequelize';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { HASH_PASSWORD } from '../../helpers';
import { IRequestExtended } from '../../models';
import { transactionWrapper } from '../../database';
import { userService } from '../../services';
import { userValidator } from '../../validators';

class UserController {
    public async getUsers(req: IRequestExtended, res: Response, next: NextFunction) {
        const users = await userService.getAllUsers();

        res.json({
            data: users
        });
    }

    createUser = (req: IRequestExtended, res: Response, next: NextFunction) => {
        return transactionWrapper(this._createUser);
    };

    private async _createUser(req: IRequestExtended, res: Response, next: NextFunction, transaction: Transaction) {
        const user = req.body;
        const userValidity = Joi.validate(user, userValidator);

        if (userValidity.error) {
            throw new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, userValidity.error.details[0].message);
        }

        user.password = await HASH_PASSWORD(user.password);

        await userService.createUser(user, transaction);

        res.status(ResponseStatusCodesEnum.CREATED).end();
    }
}

export const userController = new UserController();
