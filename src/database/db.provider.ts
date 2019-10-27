import * as sequelize from 'sequelize';
import { Sequelize } from 'sequelize';

import { config } from '../configs';

class DbProvider {
    db: Sequelize;

    constructor() {
        this.db = new (sequelize as any)(
            config.DB_NAME,
            config.DB_USER,
            config.DB_PASS,
            {
                host: config.DB_HOST,
                dialect: 'mysql',
                dialectOptions: { decimalNumbers: true }
            }
        );
    }
}

export const db = (new DbProvider()).db;
