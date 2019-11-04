import { QueryOptions, Transaction } from 'sequelize';

import { createTransaction } from './create.transaction';

export const migrationWrapper = async (method: (options: QueryOptions) => Promise<void>): Promise<void> => {
    const transaction: Transaction = await createTransaction();
    const options = { raw: true, transaction };

    try {
        await method(options);
        await transaction.commit();
    } catch {
        await transaction.rollback();
    }
};
