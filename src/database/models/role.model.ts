import { DataTypes, Model, ModelAttributes } from 'sequelize';

import { DataBaseTableNames } from '../constants';
import { DBModelFieldInit } from '../db-structure.model';
import { db } from '../db.provider';

export interface IRoleModel {
    id?: number;
    label?: string;
}

const modelAttributes: DBModelFieldInit<IRoleModel> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    label: {
        type: DataTypes.STRING
    }
};

export class RoleDBModel extends Model {}
RoleDBModel.init(
    modelAttributes as ModelAttributes,
    {
        sequelize: db,
        modelName: DataBaseTableNames.ROLE,
        tableName: DataBaseTableNames.ROLE,
        timestamps: false
    }
);
