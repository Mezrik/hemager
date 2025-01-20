import { inject } from 'inversify';
import { Task } from 'true-myth';

import { ensureThrownError, QueryError, QueryErrorTypes } from '@/common/errors';
import { Query, QueryHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { Group } from '@/domain/group/group';
import { GroupRepository } from '@/domain/group/group-repository';

export class GetGroupQuery implements Query {
  constructor(public groupId: string) {}
}

export class GetGroupQueryHandler implements QueryHandler<GetGroupQuery, Group> {
  queryToHandle = GetGroupQuery.name;

  constructor(@inject(TYPES.GroupRepository) private readonly _repository: GroupRepository) {}

  execute(query: GetGroupQuery): Task<Group, QueryError> {
    return new Task((resolve, reject) => {
      this._repository
        .findOne(query.groupId)
        .then((group) => {
          if (!group) {
            reject({ cause: 'Group not found', type: QueryErrorTypes.NOT_FOUND });
            return;
          }
          resolve(group);
        })
        .catch((err) => {
          const error = ensureThrownError(err);
          console.error(error);
          reject({
            cause: `Failed to get group - ${error.message}`,
            type: QueryErrorTypes.CAUGHT_EXCEPTION,
          });
        });
    });
  }
}
