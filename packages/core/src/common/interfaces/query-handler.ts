import { Query } from './query.js';

export interface QueryHandler<T extends Query = any, R = any> {
  queryToHandle: string;
  execute(query: T): Promise<R>;
}
