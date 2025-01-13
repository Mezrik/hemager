import { CommandBus, QueryBus } from '@/common/interfaces';
import { CreateCompetitionInput } from '../dto/competition';
import { CreateCompetitionCommand } from '@/application/command/create-competition';

export const competitionHandlers = (_queryBus: QueryBus, _commandBus: CommandBus) => {
  return {
    create: function (payload: CreateCompetitionInput) {
      return _commandBus.send(
        new CreateCompetitionCommand(
          payload.name,
          payload.organizerName,
          payload.federationName,
          payload.competitionType,
          payload.gender,
          payload.date,
        ),
      );
    },
    get: function (id: string) {
      return _queryBus.execute({ type: 'GetCompetitionQuery', id });
    },
  };
};
