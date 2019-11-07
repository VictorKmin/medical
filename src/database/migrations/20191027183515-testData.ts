// tslint:disable max-line-length
// tslint:disable tsr-detect-sql-literal-injection

import { QueryInterface, QueryOptions } from 'sequelize';
import { DataBaseTableNames } from '../constants';

import { migrationWrapper } from '../transactions';

export default {
    up: async (queryInterface: QueryInterface, dataTypes: any) => {
        const migration = async (options: QueryOptions) => {

            // #####################################
            // ROLE TEST DATA
            // #####################################
            await queryInterface.sequelize.query(`INSERT INTO ${DataBaseTableNames.ROLE} (id, label) VALUES (1, 'Student')`, options);
            await queryInterface.sequelize.query(`INSERT INTO ${DataBaseTableNames.ROLE} (id, label) VALUES (2, 'Teacher')`, options);
            await queryInterface.sequelize.query(`INSERT INTO ${DataBaseTableNames.ROLE} (id, label) VALUES (3, 'Admin')`, options);

            // #####################################
            // USER_STATUS TEST DATA
            // #####################################
            await queryInterface.sequelize.query(`INSERT INTO ${DataBaseTableNames.USER_STATUS} (id, label) VALUES (1, 'Active')`, options);

            await queryInterface.sequelize.query(`INSERT INTO ${DataBaseTableNames.USER_STATUS} (id, label) VALUES (2, 'Blocked')`, options);
            // #####################################
            // USER_ACTION TEST DATA
            // #####################################
            await queryInterface.sequelize.query(`INSERT INTO ${DataBaseTableNames.USER_ACTION} (id, label) VALUES (1, 'auth')`, options);
            await queryInterface.sequelize.query(`INSERT INTO ${DataBaseTableNames.USER_ACTION} (id, label) VALUES (2, 'confirm email')`, options);
            await queryInterface.sequelize.query(`INSERT INTO ${DataBaseTableNames.USER_ACTION} (id, label) VALUES (3, 'reset password')`, options);
        };

        await migrationWrapper(migration);
    },

    down: async (queryInterface: QueryInterface, Sequelize: any) => {
        const migration = async (options: QueryOptions) => {
            await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', options);

            await queryInterface.sequelize.query(`TRUNCATE TABLE ${DataBaseTableNames.USER}`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE ${DataBaseTableNames.OAUTH_TOKEN}`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE ${DataBaseTableNames.SPECIALTY}`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE ${DataBaseTableNames.GROUP}`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE ${DataBaseTableNames.COURSE}`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE ${DataBaseTableNames.USER_STATUS}`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE ${DataBaseTableNames.USER_ACTION}`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE ${DataBaseTableNames.ROLE}`, options);

            await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options);
        };

        await migrationWrapper(migration);
    }
};
