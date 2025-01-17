import { inject } from 'inversify';
import { Task } from 'true-myth';

import { QueryError, QueryErrorTypes } from '@/common/errors';
import { Query, QueryHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { ContestRepository } from '@/domain/contest/contest-repository';
import { Weapon } from '@/domain/contest/weapon';

export class GetAllWeaponsQuery implements Query {}

export class GetAllWeaponsQueryHandler implements QueryHandler<GetAllWeaponsQuery, Weapon[]> {
  queryToHandle = GetAllWeaponsQuery.name;

  constructor(@inject(TYPES.ContestRepository) private readonly _repository: ContestRepository) {}

  execute(): Task<Weapon[], QueryError> {
    return new Task((resolve, reject) => {
      this._repository
        .getAllWeapons()
        .then(resolve)
        .catch(() =>
          reject({ cause: 'Failed to get weapons', type: QueryErrorTypes.CAUGHT_EXCEPTION }),
        );
    });
  }
}
