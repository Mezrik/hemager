import { APIError, ClubDto, CreateClubInput, UpdateClubInput } from '@hemager/api-types';
import { instanceToPlain } from 'class-transformer';
import { Task } from 'true-myth';

import { CreateClubCommand } from '@/application/command/contestant/create-club';
import { UpdateClubCommand } from '@/application/command/contestant/update-club';
import { GetAllClubsQuery } from '@/application/query/contestant/get-all-clubs';
import { GetClubQuery } from '@/application/query/contestant/get-club';
import { commandErrorToAPIError, queryErrorToAPIError } from '@/common/errors';
import { CommandBus, QueryBus } from '@/common/interfaces';
import { Club } from '@/domain/contestant/club';

export const clubHandlers = (_queryBus: QueryBus, _commandBus: CommandBus) => {
  return {
    create: function (payload: CreateClubInput): Task<void, APIError> {
      return new Task<void, APIError>((resolve, reject) => {
        const task = _commandBus.send(new CreateClubCommand(payload.name));

        void task.match({
          Resolved: () => resolve(),
          Rejected: (error) => reject(commandErrorToAPIError(error)),
        });
      });
    },

    update: function (payload: UpdateClubInput): Task<void, APIError> {
      return new Task<void, APIError>((resolve, reject) => {
        const task = _commandBus.send(new UpdateClubCommand(payload.id, payload.name));

        void task.match({
          Resolved: () => resolve(),
          Rejected: (error) => reject(commandErrorToAPIError(error)),
        });
      });
    },

    getOne: function (id: string): Task<ClubDto, APIError> {
      return new Task((resolve, reject) => {
        void _queryBus.execute<GetClubQuery, Club>(new GetClubQuery(id)).match({
          Resolved: (contest) => {
            return resolve(instanceToPlain(contest) as ClubDto);
          },
          Rejected: (error) => reject(queryErrorToAPIError(error)),
        });
      });
    },

    getAll: function (): Task<ClubDto[], APIError> {
      return new Task((resolve, reject) => {
        void _queryBus.execute<GetAllClubsQuery, Club[]>(new GetAllClubsQuery()).match({
          Resolved: (contestants) =>
            resolve(contestants.map((contestant) => instanceToPlain(contestant) as ClubDto)),
          Rejected: (error) => reject(queryErrorToAPIError(error)),
        });
      });
    },
  };
};
