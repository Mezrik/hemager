import { inject } from 'inversify';
import { Task } from 'true-myth';

import { QueryError, QueryErrorTypes } from '@/common/errors';
import { Query, QueryHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { ContestRepository } from '@/domain/contest/contest-repository';
import { RoundRepository } from '@/domain/round/round-repository';
import { RoundResult } from '@/domain/round/round-result';

export class GetContestResultsQuery implements Query {
  constructor(public id: string) {}
}

export class GetContestResultsQueryHandler
  implements QueryHandler<GetContestResultsQuery, RoundResult[]>
{
  queryToHandle = GetContestResultsQuery.name;

  constructor(
    @inject(TYPES.ContestRepository) private readonly _repository: ContestRepository,
    @inject(TYPES.RoundRepository) private readonly _roundRepository: RoundRepository,
  ) {}

  execute(query: GetContestResultsQuery): Task<RoundResult[], QueryError> {
    return new Task((resolve, reject) => {
      if (!query.id) {
        return reject({ cause: 'Contest id is required', type: QueryErrorTypes.NOT_FOUND });
      }

      const asyncFn = async () => {
        const contest = await this._repository.findOne(query.id);
        if (!contest) {
          reject({ cause: 'Contest not found', type: QueryErrorTypes.NOT_FOUND });
          return;
        }

        const round = contest?.rounds[0];

        if (!round) {
          reject({ cause: 'Round not found', type: QueryErrorTypes.NOT_FOUND });
          return;
        }

        const results = await this._roundRepository.getRoundResults(round.id);

        if (!results) {
          reject({ cause: 'Round results not found', type: QueryErrorTypes.NOT_FOUND });
          return;
        }

        return results;
      };

      asyncFn()
        .then((results) => resolve(results ?? []))
        .catch(() => {
          reject({
            cause: 'Failed to get contest results',
            type: QueryErrorTypes.CAUGHT_EXCEPTION,
          });
        });
    });
  }
}
