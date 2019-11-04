import { Transaction, WhereOptions } from 'sequelize';

import { IUserModel, UserDBModel } from '../../database';

const attributes: Array<keyof IUserModel> = ['course', 'created_at', 'email', 'id', 'group_id', 'role_id', 'specialty_id', 'status_id'];

class UserService {

    getAllUsers() {
        return UserDBModel.findAll(); // TODO think about it
    }

    async getUserByParams(findObject: WhereOptions): Promise<Partial<IUserModel>> { // TODO model PublicUserModel
        const user = await UserDBModel.findOne({
            where: findObject,
            attributes
        }) as any;

        return user && user.dataValues
    }

    createUser(user: IUserModel, transaction: Transaction) {
        return UserDBModel.create(user, { transaction });
    }
}

export const userService = new UserService();
