import { APIError, CreateContestantInput } from '@hemager/api-types';
import { Task } from 'true-myth';

import { CreateContestantCommand } from '@/application/command/contestant/create-contestant';
import { commandErrorToAPIError } from '@/common/errors';
import { CommandBus, QueryBus } from '@/common/interfaces';
export const contestantHandlers = (_queryBus: QueryBus, _commandBus: CommandBus) => {
  return {
    create: function (payload: CreateContestantInput): Task<void, APIError> {
      return new Task<void, APIError>((resolve, reject) => {
        const task = _commandBus.send(
          new CreateContestantCommand(
            payload.firstname,
            payload.surname,

            payload.clubId,
            payload.birthdate,
            payload.gender,
            payload.rating,
          ),
        );

        void task.match({
          Resolved: () => resolve(),
          Rejected: (error) => reject(commandErrorToAPIError(error)),
        });
      });
    },
  };
};
