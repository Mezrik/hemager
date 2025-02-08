import {
  CreateContestInput,
  UpdateContestInput,
  ContestDto,
  CategoryDto,
  WeaponDto,
  APIError,
  InitializeGroupsInput,
  RoundParticipantDto,
  AssignParticipantsInput,
  ContestResultDto,
} from '@hemager/api-types';
import { Task } from 'true-myth';

import { AssignParticipantsCommand } from '@/application/command/contest/assign-participants';
import { CreateContestCommand } from '@/application/command/contest/create-contest';
import { UpdateContestCommand } from '@/application/command/contest/update-contest';
import { InitializeGroupsCommand } from '@/application/command/groups/initialize-group';
import { GetAllCategoriesQuery } from '@/application/query/constest/get-all-categories';
import { GetAllContestsQuery } from '@/application/query/constest/get-all-contests';
import { GetAllParticipantsQuery } from '@/application/query/constest/get-all-participants';
import { GetAllWeaponsQuery } from '@/application/query/constest/get-all-weapons';
import { GetContestQuery } from '@/application/query/constest/get-contest';
import { GetContestResultsQuery } from '@/application/query/constest/get-contest-results';
import { commandErrorToAPIError, queryErrorToAPIError } from '@/common/errors';
import { CommandBus, QueryBus } from '@/common/interfaces';
import { instanceToPlain } from '@/common/utils/transformer';

export const contestHandlers = (_queryBus: QueryBus, _commandBus: CommandBus) => {
  return {
    create: function (payload: CreateContestInput): Task<void, APIError> {
      return new Task<void, APIError>((resolve, reject) => {
        const task = _commandBus.send(
          new CreateContestCommand(
            payload.name,
            payload.date,
            payload.organizerName,
            payload.federationName,
            payload.contestType,
            payload.gender,
            payload.weaponId,
            payload.categoryId,
          ),
        );

        void task.match({
          Resolved: () => resolve(),
          Rejected: (error) => reject(commandErrorToAPIError(error)),
        });
      });
    },
    update: function (payload: UpdateContestInput): Task<void, APIError> {
      return new Task<void, APIError>((resolve, reject) => {
        const task = _commandBus.send(
          new UpdateContestCommand(
            payload.id,
            payload.name,
            payload.organizerName,
            payload.federationName,
            payload.contestType,
            payload.gender,
            payload.date,
            payload.weaponId,
            payload.categoryId,

            payload.expectedParticipants,
            payload.deploymentCriteria,
            payload.groupHits,
            payload.eliminationHits,
          ),
        );

        void task.match({
          Resolved: () => resolve(),
          Rejected: (error) => reject(commandErrorToAPIError(error)),
        });
      });
    },
    getAll: function (): Task<ContestDto[], APIError> {
      return new Task((resolve, reject) => {
        void _queryBus.execute<GetAllContestsQuery, ContestDto[]>(new GetAllContestsQuery()).match({
          Resolved: (contests) =>
            resolve(contests.map((contest) => instanceToPlain(contest) as ContestDto)),
          Rejected: (error) => reject(queryErrorToAPIError(error)),
        });
      });
    },
    getOne: function (id: string): Task<ContestDto, APIError> {
      return new Task((resolve, reject) => {
        void _queryBus.execute<GetContestQuery, ContestDto>(new GetContestQuery(id)).match({
          Resolved: (contest) => {
            return resolve(instanceToPlain(contest) as ContestDto);
          },
          Rejected: (error) => reject(queryErrorToAPIError(error)),
        });
      });
    },
    getAllCategories: function (): Task<CategoryDto[], APIError> {
      return new Task((resolve, reject) => {
        void _queryBus
          .execute<GetAllCategoriesQuery, CategoryDto[]>(new GetAllCategoriesQuery())
          .match({
            Resolved: (contests) =>
              resolve(contests.map((contest) => instanceToPlain(contest) as ContestDto)),
            Rejected: (error) => reject(queryErrorToAPIError(error)),
          });
      });
    },
    getAllWeapons: function (): Task<WeaponDto[], APIError> {
      return new Task((resolve, reject) => {
        void _queryBus.execute<GetAllWeaponsQuery, WeaponDto[]>(new GetAllWeaponsQuery()).match({
          Resolved: (contests) =>
            resolve(contests.map((contest) => instanceToPlain(contest) as ContestDto)),
          Rejected: (error) => reject(queryErrorToAPIError(error)),
        });
      });
    },

    initGroups: function (payload: InitializeGroupsInput): Task<void, APIError> {
      return new Task((resolve, reject) => {
        void _commandBus
          .send(new InitializeGroupsCommand(payload.contestId, payload.maxParticipantsPerGroup))
          .match({
            Resolved: () => resolve(),
            Rejected: (error) => reject(commandErrorToAPIError(error)),
          });
      });
    },

    getAllParticipants: function (id: string): Task<RoundParticipantDto[], APIError> {
      return new Task((resolve, reject) => {
        void _queryBus
          .execute<GetAllParticipantsQuery, RoundParticipantDto[]>(new GetAllParticipantsQuery(id))
          .match({
            Resolved: (participants) => {
              return resolve(participants.map((p) => instanceToPlain(p) as RoundParticipantDto));
            },
            Rejected: (error) => reject(queryErrorToAPIError(error)),
          });
      });
    },

    assignParticipants: function (payload: AssignParticipantsInput): Task<void, APIError> {
      return new Task((resolve, reject) => {
        void _commandBus
          .send(new AssignParticipantsCommand(payload.contestId, payload.participants))
          .match({
            Resolved: () => resolve(),
            Rejected: (error) => reject(commandErrorToAPIError(error)),
          });
      });
    },

    getResults: function (contestId: string): Task<ContestResultDto[], APIError> {
      return new Task((resolve, reject) => {
        void _queryBus
          .execute<GetContestQuery, ContestDto>(new GetContestResultsQuery(contestId))
          .match({
            Resolved: (contest) => {
              return resolve(instanceToPlain(contest) as ContestResultDto[]);
            },
            Rejected: (error) => reject(queryErrorToAPIError(error)),
          });
      });
    },
  };
};
