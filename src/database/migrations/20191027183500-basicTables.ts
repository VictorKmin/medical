import { DataTypes, ModelAttributes, QueryInterface, QueryOptions } from 'sequelize';

// tslint:disable max-line-length
import { UserRolesEnum, UserStatusEnum } from '../../constants';
import { DataBaseTableNames } from '../constants';
import { DBModelFieldInit } from '../db-structure.model';
import {
  IGroupModel,
  IOauthTokenModel,
  ISpecialtyModel,
  IRoleModel,
  IUserModel,
  IUserActionModel,
  IUserStatusModel
} from '../models';
import { migrationWrapper } from '../transactions';

export default {
  up: async (queryInterface: QueryInterface, dataTypes: any) => {
    const migration = async (options: QueryOptions) => {
      const roleModelAttributes: DBModelFieldInit<IRoleModel> = {
        id: {
          type: dataTypes.INTEGER,
          primaryKey: true,
          unique: true
        },
        label: {
          type: dataTypes.STRING(20)
        }
      };
      await queryInterface.createTable(DataBaseTableNames.ROLE, roleModelAttributes as ModelAttributes, options);

      const groupModelAttributes: DBModelFieldInit<IGroupModel> = {
        id: {
          type: dataTypes.INTEGER,
          primaryKey: true,
          unique: true
        },
        label: {
          type: dataTypes.STRING(20)
        }
      };
      await queryInterface.createTable(DataBaseTableNames.GROUP, groupModelAttributes as ModelAttributes, options);

      const specialtyModelAttributes: DBModelFieldInit<ISpecialtyModel> = {
        id: {
          type: dataTypes.INTEGER,
          primaryKey: true,
          unique: true
        },
        label: {
          type: dataTypes.STRING(50)
        }
      };
      await queryInterface.createTable(DataBaseTableNames.SPECIALTY, specialtyModelAttributes as ModelAttributes, options);

      const userStatusModelAttributes: DBModelFieldInit<IUserStatusModel> = {
        id: {
          type: dataTypes.INTEGER,
          primaryKey: true,
          unique: true
        },
        label: {
          type: dataTypes.STRING
        }
      };
      await queryInterface.createTable(DataBaseTableNames.USER_STATUS, userStatusModelAttributes as ModelAttributes, options);

      const userActionModelAttributes: DBModelFieldInit<IUserActionModel> = {
        id: {
          type: dataTypes.INTEGER,
          primaryKey: true,
          unique: true
        },
        label: {
          type: dataTypes.STRING
        }
      };
      await queryInterface.createTable(DataBaseTableNames.USER_STATUS, userActionModelAttributes as ModelAttributes, options);

      const userModelAttributes: DBModelFieldInit<IUserModel> = {
        id: {
          type: dataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: dataTypes.STRING
        },
        email: {
          type: dataTypes.STRING,
          unique: true,
          allowNull: false
        },
        password: {
          type: dataTypes.STRING,
          allowNull: false
        },
        role_id: {
          type: dataTypes.INTEGER,
          defaultValue: UserRolesEnum.STUDENT,
          references: {
            model: DataBaseTableNames.ROLE,
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL' // TODO SET DEFAULT
        },
        course: {
          type: dataTypes.INTEGER
        },
        specialty_id: {
          type: dataTypes.INTEGER,
          references: {
            model: DataBaseTableNames.SPECIALTY,
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        group_id: {
          type: dataTypes.INTEGER,
          references: {
            model: DataBaseTableNames.GROUP,
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        status_id: {
          type: dataTypes.INTEGER,
          defaultValue: UserStatusEnum.ACTIVE,
          references: {
            model: DataBaseTableNames.USER_STATUS,
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        created_at: {
          type: dataTypes.DATE,
          allowNull: false
        },
        updated_at: {
          type: dataTypes.DATE,
          allowNull: true
        }
      };
      await queryInterface.createTable(DataBaseTableNames.USER, userModelAttributes as ModelAttributes, options);

      const ouathTokenModel: DBModelFieldInit<IOauthTokenModel> = {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: DataBaseTableNames.USER,
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        access_token: {
          type: DataTypes.STRING,
          allowNull: false
        },
        refresh_token: {
          type: DataTypes.STRING,
          allowNull: false
        }
      }
      await queryInterface.createTable(DataBaseTableNames.OAUTH_TOKEN, ouathTokenModel as ModelAttributes, options);

      return Promise.resolve();
    };

    await migrationWrapper(migration);
  },

  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    const migration = async (options: QueryOptions) => {
      await queryInterface.dropAllTables(options);
    };

    await migrationWrapper(migration);
  }
};
