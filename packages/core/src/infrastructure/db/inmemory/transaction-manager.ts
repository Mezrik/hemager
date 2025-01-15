// infrastructure/db/SequelizeTransactionManager.ts
import { inject } from 'inversify';
import { Sequelize, Transaction } from 'sequelize';

import { TransactionManager } from '@/common/interfaces/transaction-manager';
import { TYPES } from '@/di-types';

export class SequelizeTransactionManager implements TransactionManager {
  constructor(@inject(TYPES.Db) private sequelize: Sequelize) {}

  async execute<T>(callback: (transaction: Transaction) => Promise<T>): Promise<T> {
    const transaction = await this.sequelize.transaction();
    try {
      const result = await callback(transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
