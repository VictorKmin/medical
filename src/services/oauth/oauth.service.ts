import { Transaction, WhereOptions } from 'sequelize';

import { IOauthTokenModel, OauthTokenDBModel } from '../../database';

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
}

export const oauthService = new OAuthService();
