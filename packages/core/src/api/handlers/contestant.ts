import {
  APIError,
  ContestantDto,
  CreateContestantInput,
  UpdateContestantInput,
} from '@hemager/api-types';
import { instanceToPlain } from 'class-transformer';
import { Task } from 'true-myth';

import { CreateContestantCommand } from '@/application/command/contestant/create-contestant';
import { UpdateContestantCommand } from '@/application/command/contestant/update-contestant';
import { GetAllContestantsQuery } from '@/application/query/contestant/get-all-contestants';
import { GetContestantQuery } from '@/application/query/contestant/get-contestant';
import { commandErrorToAPIError, queryErrorToAPIError } from '@/common/errors';
import { CommandBus, QueryBus } from '@/common/interfaces';
import { Contestant } from '@/domain/contestant/contestant';

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
            payload.nationality,
          ),
        );

        void task.match({
          Resolved: () => resolve(),
          Rejected: (error) => reject(commandErrorToAPIError(error)),
        });
      });
    },

    update: function (payload: UpdateContestantInput): Task<void, APIError> {
      return new Task<void, APIError>((resolve, reject) => {
        const task = _commandBus.send(
          new UpdateContestantCommand(
            payload.id,
            payload.firstname,
            payload.surname,

            payload.clubId,
            payload.birthdate,
            payload.gender,
            payload.rating,
            payload.nationality,
          ),
        );

        void task.match({
          Resolved: () => resolve(),
          Rejected: (error) => reject(commandErrorToAPIError(error)),
        });
      });
    },

    getOne: function (id: string): Task<ContestantDto, APIError> {
      return new Task((resolve, reject) => {
        void _queryBus
          .execute<GetContestantQuery, ContestantDto>(new GetContestantQuery(id))
          .match({
            Resolved: (contest) => {
              return resolve(instanceToPlain(contest) as ContestantDto);
            },
            Rejected: (error) => reject(queryErrorToAPIError(error)),
          });
      });
    },

    getAll: function (): Task<ContestantDto[], APIError> {
      return new Task((resolve, reject) => {
        void _queryBus
          .execute<GetAllContestantsQuery, Contestant[]>(new GetAllContestantsQuery())
          .match({
            Resolved: (contestants) =>
              resolve(
                contestants.map((contestant) => instanceToPlain(contestant) as ContestantDto),
              ),
            Rejected: (error) => reject(queryErrorToAPIError(error)),
          });
      });
    },
  };
};
