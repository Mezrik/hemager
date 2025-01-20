import { inject } from 'inversify';
import { Task } from 'true-myth';

import { QueryError, QueryErrorTypes } from '@/common/errors';
import { Query, QueryHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { Contestant } from '@/domain/contestant/contestant';
import { ContestantRepository } from '@/domain/contestant/contestant-repository';

export class GetAllContestantsQuery implements Query {}

export class GetAllContestantsQueryHandler
  implements QueryHandler<GetAllContestantsQuery, Contestant[]>
{
  queryToHandle = GetAllContestantsQuery.name;

  constructor(
    @inject(TYPES.ContestantRepository) private readonly _repository: ContestantRepository,
  ) {}

  execute(): Task<Contestant[], QueryError> {
    return new Task((resolve, reject) => {
      this._repository
        .findAll()
        .then(resolve)
        .catch(() =>
          reject({ cause: 'Failed to get contestants', type: QueryErrorTypes.CAUGHT_EXCEPTION }),
        );
    });
  }
}
