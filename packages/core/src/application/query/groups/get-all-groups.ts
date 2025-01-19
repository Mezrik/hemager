import { inject } from 'inversify';
import { Task } from 'true-myth';

import { QueryError, QueryErrorTypes } from '@/common/errors';
import { Query, QueryHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { Group } from '@/domain/group/group';
import { GroupRepository } from '@/domain/group/group-repository';

export class GetAllGroupsQuery implements Query {
  constructor(public roundId: string) {}
}

export class GetAllGroupsQueryHandler implements QueryHandler<GetAllGroupsQuery, Group[]> {
  queryToHandle = GetAllGroupsQuery.name;

  constructor(@inject(TYPES.GroupRepository) private readonly _repository: GroupRepository) {}

  execute(query: GetAllGroupsQuery): Task<Group[], QueryError> {
    return new Task((resolve, reject) => {
      this._repository
        .findByRoundId(query.roundId)
        .then(resolve)
        .catch(() =>
          reject({ cause: 'Failed to get groups', type: QueryErrorTypes.CAUGHT_EXCEPTION }),
        );
    });
  }
}
