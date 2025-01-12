import { Query, QueryBus as QueryBusInterface, QueryHandler } from 'common/interfaces';
import { injectable } from 'inversify';

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

  public async execute<T extends BaseQuery = BaseQuery, R = any>(query: T) {
    if (this.handlers.has(query.constructor.name)) {
      return (this.handlers.get(query.constructor.name) as QueryHandler<BaseQuery>).execute(query);
    }
  }
}
