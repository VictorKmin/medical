// tslint:disable max-line-length

import { QueryInterface, QueryOptions } from 'sequelize';

import { migrationWrapper } from '../transactions';

export default {
    up: async (queryInterface: QueryInterface, dataTypes: any) => {
        const migration = async (options: QueryOptions) => {

            // #####################################
            // ROLE TEST DATA
            // #####################################
            await queryInterface.sequelize.query(`INSERT INTO role (id, label) VALUES (1, 'Student')`, options);
            await queryInterface.sequelize.query(`INSERT INTO role (id, label) VALUES (2, 'Teacher')`, options);
            await queryInterface.sequelize.query(`INSERT INTO role (id, label) VALUES (3, 'Admin')`, options);

            // #####################################
            // USER_STATUS TEST DATA
            // #####################################
            await queryInterface.sequelize.query(`INSERT INTO user_status (id, label) VALUES (1, 'Active')`, options);
            await queryInterface.sequelize.query(`INSERT INTO user_status (id, label) VALUES (2, 'Blocked')`, options);
        };

        await migrationWrapper(migration);
    },

    down: async (queryInterface: QueryInterface, Sequelize: any) => {
        const migration = async (options: QueryOptions) => {
            await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', options);

            await queryInterface.sequelize.query(`TRUNCATE TABLE transaction`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE vote`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE comment`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE action_token`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE oauth_token`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE milestone`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE phase`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE phase_status`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE document`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE project`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE project_category`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE project_status`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE organization`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE user`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE user_status`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE country`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE document_type`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE role`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE action`, options);
            await queryInterface.sequelize.query(`TRUNCATE TABLE constant`, options);

            await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options);
        };

        await migrationWrapper(migration);
    }
};
