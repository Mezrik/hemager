import { inject } from 'inversify';
import { Task } from 'true-myth';

import { QueryError, QueryErrorTypes } from '@/common/errors';
import { Query, QueryHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { Contestant } from '@/domain/contestant/contestant';
import { ContestantRepository } from '@/domain/contestant/contestant-repository';

export class GetContestantQuery implements Query {
  constructor(public id: string) {}
}

export class GetContestantQueryHandler implements QueryHandler<GetContestantQuery, Contestant> {
  queryToHandle = GetContestantQuery.name;

  constructor(
    @inject(TYPES.ContestantRepository) private readonly _repository: ContestantRepository,
  ) {}

  execute(query: GetContestantQuery): Task<Contestant, QueryError> {
    return new Task((resolve, reject) => {
      this._repository
        .findOne(query.id)
        .then((contestant) => {
          if (!contestant) {
            reject({ cause: 'Contestant not found', type: QueryErrorTypes.NOT_FOUND });
            return;
          }
          resolve(contestant);
        })
        .catch(() =>
          reject({ cause: 'Failed to get contestant', type: QueryErrorTypes.CAUGHT_EXCEPTION }),
        );
    });
  }
}
