import { inject } from 'inversify';
import { Task } from 'true-myth';

import { QueryError, QueryErrorTypes } from '@/common/errors';
import { Query, QueryHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { Contest } from '@/domain/contest/contest';
import { ContestRepository } from '@/domain/contest/contest-repository';

export class GetContestQuery implements Query {
  constructor(public id: string) {}
}

export class GetContestQueryHandler implements QueryHandler<GetContestQuery, Contest> {
  queryToHandle = GetContestQuery.name;

  constructor(@inject(TYPES.ContestRepository) private readonly _repository: ContestRepository) {}

  execute(query: GetContestQuery): Task<Contest, QueryError> {
    return new Task((resolve, reject) => {
      this._repository
        .findOne(query.id)
        .then((contest) => {
          if (!contest) {
            reject({ cause: 'Contest not found', type: QueryErrorTypes.NOT_FOUND });
            return;
          }
          resolve(contest);
        })
        .catch(() =>
          reject({ cause: 'Failed to get contest', type: QueryErrorTypes.CAUGHT_EXCEPTION }),
        );
    });
  }
}
