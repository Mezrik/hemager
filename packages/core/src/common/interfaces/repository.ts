import { Transaction } from './transaction';

export interface Repository<T> {
  findOne(id: any): Promise<T>;
  findAll(): Promise<T[]>;
  create(item: T, transaction?: Transaction): Promise<T>;
  update(id: any, item: T, transaction?: Transaction): Promise<void>;
  destroy(id: any, transaction?: Transaction): Promise<void>;
}
