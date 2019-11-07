import { Op, Transaction, WhereOptions } from 'sequelize';

import { UserRolesEnum } from '../../constants';
import { IDBResponse, IOauthTokenModel, IUser, IUserModel, OauthTokenDBModel, UserDBModel } from '../../database';

const attributes: Array<keyof IUser> = ['id', 'name', 'name', 'email', 'group_id', 'role_id', 'specialty_id', 'status_id'];

class OAuthService {

    getAuthTokenByParams(findObject: WhereOptions): Promise<any> { // TODO interface with dataValues
        return OauthTokenDBModel.findOne({
            where: findObject
        });
    }

    createOauthToke(createObject: IOauthTokenModel, transaction: Transaction): Promise<void> {
        return OauthTokenDBModel.create(createObject, { transaction }) as any;
    }

    deleteOathTokenByParams(deleteObject: WhereOptions, transaction: Transaction) {
        return OauthTokenDBModel.destroy({
            where: deleteObject,
            transaction
        });
    }

    async getUserFromAccessToken(access_token: string): Promise<IUser> {
        const dbResponse: any = await OauthTokenDBModel.findOne({
            where: {
                access_token: {
                    [Op.like]: access_token
                }
            },
            include: [{
                model: UserDBModel,
                attributes
            }]
        });

        return dbResponse && dbResponse.user && dbResponse.user.dataValues;
    }

    async getUserFromRefreshToken(refresh_token: string): Promise<any> {
        const dbResponse: any = await OauthTokenDBModel.findOne({
            where: {
                refresh_token: {
                    [Op.like]: refresh_token
                }
            },
            include: [{
                model: UserDBModel,
                attributes
            }]
        });

        return dbResponse && dbResponse.user && dbResponse.user.dataValues;
    }

    async authAdmin(email: string): Promise<IUserModel> {
        const user: IDBResponse<IUserModel> = await UserDBModel.findOne({
            where: {
                email,
                role_id: {
                    [Op.eq]: UserRolesEnum.ADMIN
                }
            }
        }) as any;

        return user && user.dataValues;
    }
}

export const oauthService = new OAuthService();
