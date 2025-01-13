import { QueryBus, CommandBus } from '@/common/interfaces';

export abstract class BaseAPI {
  constructor(
    protected readonly _queryBus: QueryBus,
    protected readonly _commandBus: CommandBus,
  ) {}
}
