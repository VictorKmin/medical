import { DataTypes, Model, ModelAttributes } from 'sequelize';

import { DataBaseTableNames } from '../constants';
import { DBModelFieldInit } from '../db-structure.model';
import { db } from '../db.provider';

export interface IUserActionModel {
    id?: number;
    label?: string;
}

const modelAttributes: DBModelFieldInit<IUserActionModel> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    label: {
        type: DataTypes.STRING
    }
};

// TODO think about this. Maybe we dont need this table

export class UserActionDBModel extends Model {}
UserActionDBModel.init(
    modelAttributes as ModelAttributes,
    {
        sequelize: db,
        modelName: DataBaseTableNames.USER_ACTION,
        tableName: DataBaseTableNames.USER_ACTION,
        timestamps: false
    }
);
