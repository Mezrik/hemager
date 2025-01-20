import { inject } from 'inversify';
import { Task } from 'true-myth';

import { ensureThrownError, QueryError, QueryErrorTypes } from '@/common/errors';
import { Query, QueryHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { ContestRepository } from '@/domain/contest/contest-repository';
import { Group } from '@/domain/group/group';
import { GroupRepository } from '@/domain/group/group-repository';
import { RoundRepository } from '@/domain/round/round-repository';

export class GetAllGroupsQuery implements Query {
  constructor(public contestId: string) {}
}

export class GetAllGroupsQueryHandler implements QueryHandler<GetAllGroupsQuery, Group[]> {
  queryToHandle = GetAllGroupsQuery.name;

  constructor(
    @inject(TYPES.GroupRepository) private readonly _repository: GroupRepository,
    @inject(TYPES.ContestRepository) private readonly _contestRepository: ContestRepository,
    @inject(TYPES.RoundRepository) private readonly _roundRepository: RoundRepository,
  ) {}

  execute(query: GetAllGroupsQuery): Task<Group[], QueryError> {
    return new Task((resolve, reject) => {
      const asyncFn = async () => {
        const contest = await this._contestRepository.findOne(query.contestId);
        if (!contest) {
          reject({ cause: 'Contest not found', type: QueryErrorTypes.NOT_FOUND });
          return;
        }
        const firstRound = contest.rounds[0];

        if (!firstRound) {
          reject({ cause: 'Round not found', type: QueryErrorTypes.NOT_FOUND });
          return;
        }

        const round = await this._roundRepository.findOne(firstRound.id);

        if (!round) {
          reject({ cause: 'Round not found', type: QueryErrorTypes.NOT_FOUND });
          return;
        }

        const groups = await this._repository.findByRoundId(round.id);
        return groups;
      };

      asyncFn()
        .then((groups) => {
          if (!groups) {
            reject({ cause: 'Groups not found', type: QueryErrorTypes.NOT_FOUND });
            return;
          }

          resolve(groups);
        })
        .catch((err) => {
          const error = ensureThrownError(err);
          console.error(error);
          reject({
            cause: `Failed to get groups - ${error.message}`,
            type: QueryErrorTypes.CAUGHT_EXCEPTION,
          });
        });
    });
  }
}
