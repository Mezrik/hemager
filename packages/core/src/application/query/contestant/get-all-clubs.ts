import { inject } from 'inversify';
import { Task } from 'true-myth';

import { QueryError, QueryErrorTypes } from '@/common/errors';
import { Query, QueryHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { Club } from '@/domain/contestant/club';
import { ClubRepository } from '@/domain/contestant/club-repository';

export class GetAllClubsQuery implements Query {}

export class GetAllClubsQueryHandler implements QueryHandler<GetAllClubsQuery, Club[]> {
  queryToHandle = GetAllClubsQuery.name;

  constructor(@inject(TYPES.ClubRepository) private readonly _repository: ClubRepository) {}

  execute(): Task<Club[], QueryError> {
    return new Task((resolve, reject) => {
      this._repository
        .findAll()
        .then(resolve)
        .catch(() =>
          reject({ cause: 'Failed to get Clubs', type: QueryErrorTypes.CAUGHT_EXCEPTION }),
        );
    });
  }
}
