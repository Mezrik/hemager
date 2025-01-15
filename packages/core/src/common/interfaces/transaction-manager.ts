import { Transaction } from './transaction';

export interface TransactionManager {
  execute<T>(callback: (transaction: Transaction) => Promise<T>): Promise<T>;
}
