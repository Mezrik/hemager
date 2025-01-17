import { inject } from 'inversify';
import { Task } from 'true-myth';

import { QueryError, QueryErrorTypes } from '@/common/errors';
import { Query, QueryHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { Contest } from '@/domain/contest/contest';
import { ContestRepository } from '@/domain/contest/contest-repository';

export class GetAllContestsQuery implements Query {}

export class GetAllContestsQueryHandler implements QueryHandler<GetAllContestsQuery, Contest[]> {
  queryToHandle = GetAllContestsQuery.name;

  constructor(@inject(TYPES.ContestRepository) private readonly _repository: ContestRepository) {}

  execute(): Task<Contest[], QueryError> {
    return new Task((resolve, reject) => {
      this._repository
        .findAll()
        .then(resolve)
        .catch(() =>
          reject({ cause: 'Failed to get contests', type: QueryErrorTypes.CAUGHT_EXCEPTION }),
        );
    });
  }
}
