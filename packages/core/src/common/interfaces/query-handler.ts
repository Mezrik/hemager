import Task from 'true-myth/task';

import { QueryError } from '../errors';

import { Query } from './query';

export interface QueryHandler<T extends Query = any, R = any> {
  queryToHandle: string;
  execute(query: T): Task<R, QueryError>;
}
