import { inject } from 'inversify';
import { Task } from 'true-myth';

import { QueryError, QueryErrorTypes } from '@/common/errors';
import { Query, QueryHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { Club } from '@/domain/contestant/club';
import { ClubRepository } from '@/domain/contestant/club-repository';

export class GetClubQuery implements Query {
  constructor(public id: string) {}
}

export class GetClubQueryHandler implements QueryHandler<GetClubQuery, Club> {
  queryToHandle = GetClubQuery.name;

  constructor(@inject(TYPES.ClubRepository) private readonly _repository: ClubRepository) {}

  execute(query: GetClubQuery): Task<Club, QueryError> {
    return new Task((resolve, reject) => {
      this._repository
        .findOne(query.id)
        .then((club) => {
          if (!club) {
            reject({ cause: 'Club not found', type: QueryErrorTypes.NOT_FOUND });
            return;
          }
          resolve(club);
        })
        .catch(() =>
          reject({ cause: 'Failed to get club', type: QueryErrorTypes.CAUGHT_EXCEPTION }),
        );
    });
  }
}
