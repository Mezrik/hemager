import { inject } from 'inversify';
import { Task } from 'true-myth';

import { QueryError, QueryErrorTypes } from '@/common/errors';
import { Query, QueryHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { Match } from '@/domain/match/match';
import { MatchRepository } from '@/domain/match/match-repository';

export class GetAllMatchesQuery implements Query {
  constructor(public groupId: string) {}
}

export class GetAllMatchesQueryHandler implements QueryHandler<GetAllMatchesQuery, Match[]> {
  queryToHandle = GetAllMatchesQuery.name;

  constructor(@inject(TYPES.MatchRepository) private readonly _repository: MatchRepository) {}

  execute(query: GetAllMatchesQuery): Task<Match[], QueryError> {
    return new Task((resolve, reject) => {
      this._repository
        .findByGroupId(query.groupId)
        .then(resolve)
        .catch(() =>
          reject({ cause: 'Failed to get matches', type: QueryErrorTypes.CAUGHT_EXCEPTION }),
        );
    });
  }
}
