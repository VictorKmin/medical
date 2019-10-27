import { DataTypes, Model, ModelAttributes, Sequelize } from 'sequelize';

import { RegExpEnum, UserStatusEnum } from '../../constants';
import { DataBaseTableNames } from '../constants';
import { DBModelFieldInit } from '../db-structure.model';
import { db } from '../db.provider';
import { RoleDBModel } from './role.model';
import { GroupDBModel } from './group.model';
import { UserStatusDBModel } from './user-status.model';
import { SpecialtyDBModel } from './specialty.model';

export interface IUserModel {
    id: number;
    name: string;
    email: string;
    password: string;
    role_id: number;
    status_id: number;
    group_id?: number;
    specialty_id?: number;
    course?: number;
    created_at: string;
    updated_at?: string;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    role_id: number;
    status_id: number;
    group_id?: number;
    specialty_id?: number;
    course?: number;
    created_at: string;
}

const modelAttributes: DBModelFieldInit<IUserModel> = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            notEmpty: true,
            is: {
                args: RegExpEnum.email,
                msg: 'Email must be correct'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    role_id: {
        type: DataTypes.INTEGER
    },
    status_id: {
        type: DataTypes.INTEGER,
        defaultValue: UserStatusEnum.ACTIVE
    },
    group_id: {
      type: DataTypes.INTEGER
    },
    specialty_id: {
      type: DataTypes.INTEGER
    },
    course: {
        type: DataTypes.INTEGER
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('UTC_TIMESTAMP'),
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE
    }
};

export class UserDBModel extends Model {}
UserDBModel.init(
    modelAttributes as ModelAttributes,
    {
        sequelize: db,
        modelName: DataBaseTableNames.USER,
        tableName: DataBaseTableNames.USER,
        timestamps: false
    }
);
UserDBModel.belongsTo(SpecialtyDBModel, { foreignKey: 'specialty_id' });
UserDBModel.belongsTo(GroupDBModel, { foreignKey: 'group_id' });
UserDBModel.belongsTo(RoleDBModel, { foreignKey: 'role_id' });
UserDBModel.belongsTo(UserStatusDBModel, { foreignKey: 'status_id' });
