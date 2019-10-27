import { DataTypes, Model, ModelAttributes } from 'sequelize';

import { DataBaseTableNames } from '../constants';
import { DBModelFieldInit } from '../db-structure.model';
import { db } from '../db.provider';

export interface ICourseModel {
    id?: number;
    label?: string;
}

const modelAttributes: DBModelFieldInit<ICourseModel> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    label: {
        type: DataTypes.STRING
    }
};

export class CourseDBModel extends Model {}
CourseDBModel.init(
    modelAttributes as ModelAttributes,
    {
        sequelize: db,
        modelName: DataBaseTableNames.COURSE,
        tableName: DataBaseTableNames.COURSE,
        timestamps: false
    }
);
