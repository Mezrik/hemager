import { inject } from 'inversify';
import { Task } from 'true-myth';

import { QueryError, QueryErrorTypes } from '@/common/errors';
import { Query, QueryHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { Match } from '@/domain/match/match';
import { MatchRepository } from '@/domain/match/match-repository';

export class GetMatchQuery implements Query {
  constructor(public matchId: string) {}
}

export class GetMatchQueryHandler implements QueryHandler<GetMatchQuery, Match> {
  queryToHandle = GetMatchQuery.name;

  constructor(@inject(TYPES.MatchRepository) private readonly _repository: MatchRepository) {}

  execute(query: GetMatchQuery): Task<Match, QueryError> {
    return new Task((resolve, reject) => {
      this._repository
        .findOne(query.matchId)
        .then((match) => {
          if (!match) {
            reject({ cause: 'Match not found', type: QueryErrorTypes.NOT_FOUND });
            return;
          }

          resolve(match);
        })
        .catch(() =>
          reject({ cause: 'Failed to get match', type: QueryErrorTypes.CAUGHT_EXCEPTION }),
        );
    });
  }
}
