import { CommandBus, QueryBus } from '@/common/interfaces';
import { CreateContestCommand } from '@/application/command/create-contest';

import * as CompetititonTypes from '@/api/dto/contest';

export const contestHandlers = (_queryBus: QueryBus, _commandBus: CommandBus) => {
  return {
    create: function (payload: CompetititonTypes.CreateContestInput) {
      return _commandBus.send(
        new CreateContestCommand(
          payload.name,
          payload.organizerName,
          payload.federationName,
          payload.contestType,
          payload.gender,
          payload.date,
        ),
      );
    },
    get: function (id: string) {
      return _queryBus.execute({ type: 'GetContestQuery', id });
    },
  };
};
