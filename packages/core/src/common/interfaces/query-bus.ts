import { Query } from './query.js';
import { QueryHandler } from './query-handler.js';

export interface QueryBus<BaseQuery extends Query = Query> {
  registerHandler(queryHandler: QueryHandler<BaseQuery>): void;
  execute<T extends BaseQuery = BaseQuery, R = any>(query: T): Promise<R>;
}
