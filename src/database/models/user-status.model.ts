import { DataTypes, Model, ModelAttributes } from 'sequelize';

import { DataBaseTableNames } from '../constants';
import { DBModelFieldInit } from '../db-structure.model';
import { db } from '../db.provider';

export interface IUserStatusModel {
    id?: number;
    label?: string;
}

const modelAttributes: DBModelFieldInit<IUserStatusModel> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    label: {
        type: DataTypes.STRING
    }
};

export class UserStatusDBModel extends Model {}
UserStatusDBModel.init(
    modelAttributes as ModelAttributes,
    {
        sequelize: db,
        modelName: DataBaseTableNames.USER_STATUS,
        tableName: DataBaseTableNames.USER_STATUS,
        timestamps: false
    }
);
