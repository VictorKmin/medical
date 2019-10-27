import { DataTypes, Model, ModelAttributes } from 'sequelize';

import { DataBaseTableNames } from '../constants';
import { DBModelFieldInit } from '../db-structure.model';
import { db } from '../db.provider';

export interface IGroupModel {
    id?: number;
    label?: string;
}

const modelAttributes: DBModelFieldInit<IGroupModel> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    label: {
        type: DataTypes.STRING
    }
};

export class GroupDBModel extends Model {}
GroupDBModel.init(
    modelAttributes as ModelAttributes,
    {
        sequelize: db,
        modelName: DataBaseTableNames.GROUP,
        tableName: DataBaseTableNames.GROUP,
        timestamps: false
    }
);
