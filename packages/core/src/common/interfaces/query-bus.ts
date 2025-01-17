import Task from 'true-myth/task';

import { QueryError } from '../errors.js';

import { QueryHandler } from './query-handler.js';
import { Query } from './query.js';

export interface QueryBus<BaseQuery extends Query = Query> {
  registerHandler(queryHandler: QueryHandler<BaseQuery>): void;
  execute<T extends BaseQuery = BaseQuery, R = any>(query: T): Task<R, QueryError>;
}
