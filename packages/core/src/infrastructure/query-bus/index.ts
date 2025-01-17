import { resolve } from 'path';

import { injectable } from 'inversify';
import Task from 'true-myth/task';

import { InternalError, QueryError, QueryErrorTypes } from '@/common/errors';
import { Query, QueryBus as QueryBusInterface, QueryHandler } from '@/common/interfaces';

@injectable()
export class QueryBus<BaseQuery extends Query = Query> implements QueryBusInterface<BaseQuery> {
  public handlers: Map<string, QueryHandler<BaseQuery>> = new Map();

  public registerHandler(handler: QueryHandler<BaseQuery>) {
    const queryName = handler.queryToHandle;
    if (this.handlers.has(queryName)) {
      return;
    }
    this.handlers.set(queryName, handler);
  }

  public execute<T extends BaseQuery = BaseQuery, R = any>(query: T): Task<R, QueryError> {
    return new Task((resolve, reject) => {
      if (this.handlers.has(query.constructor.name)) {
        const task = (this.handlers.get(query.constructor.name) as QueryHandler<BaseQuery>).execute(
          query,
        );

        void task.match({
          Resolved: (result) => resolve(result as R),
          Rejected: reject,
        });
      } else
        reject({
          cause: 'Query not found, check if registered.',
          type: QueryErrorTypes.QUERY_NOT_BOUND,
        });
    });
  }
}
