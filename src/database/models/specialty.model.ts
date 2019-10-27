import { DataTypes, Model, ModelAttributes } from 'sequelize';

import { DataBaseTableNames } from '../constants';
import { DBModelFieldInit } from '../db-structure.model';
import { db } from '../db.provider';

export interface ISpecialtyModel {
    id?: number;
    label?: string;
}

const modelAttributes: DBModelFieldInit<ISpecialtyModel> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    label: {
        type: DataTypes.STRING
    }
};

export class SpecialtyDBModel extends Model {}
SpecialtyDBModel.init(
    modelAttributes as ModelAttributes,
    {
        sequelize: db,
        modelName: DataBaseTableNames.SPECIALTY,
        tableName: DataBaseTableNames.SPECIALTY,
        timestamps: false
    }
);
