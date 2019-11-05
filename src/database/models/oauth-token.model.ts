import { DataTypes, Model, ModelAttributes } from 'sequelize';

import { DataBaseTableNames } from '../constants';
import { DBModelFieldInit } from '../db-structure.model';
import { db } from '../db.provider';

export interface IOauthTokenModel {
    id?: number;
    user_id: number;
    access_token: string;
    refresh_token: string;
}

const modelAttributes: DBModelFieldInit<IOauthTokenModel> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    access_token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refresh_token: {
        type: DataTypes.STRING,
        allowNull: false
    }
};

export class OauthTokenDBModel extends Model {
}

OauthTokenDBModel.init(
    modelAttributes as ModelAttributes,
    {
        sequelize: db,
        modelName: DataBaseTableNames.OAUTH_TOKEN,
        tableName: DataBaseTableNames.OAUTH_TOKEN,
        timestamps: false
    }
);
