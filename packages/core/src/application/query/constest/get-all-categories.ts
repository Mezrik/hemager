import { resolve } from 'path';

import { inject } from 'inversify';
import { Task } from 'true-myth';

import { QueryError, QueryErrorTypes } from '@/common/errors';
import { Query, QueryHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { ContestCategory } from '@/domain/contest/category';
import { ContestRepository } from '@/domain/contest/contest-repository';

export class GetAllCategoriesQuery implements Query {}

export class GetAllCategoriesQueryHandler
  implements QueryHandler<GetAllCategoriesQuery, ContestCategory[]>
{
  queryToHandle = GetAllCategoriesQuery.name;

  constructor(@inject(TYPES.ContestRepository) private readonly _repository: ContestRepository) {}

  execute(): Task<ContestCategory[], QueryError> {
    return new Task((resolve, reject) => {
      this._repository
        .getAllCategories()
        .then((categories) => {
          resolve(categories);
        })
        .catch(() =>
          reject({ cause: 'Failed to get categories', type: QueryErrorTypes.CAUGHT_EXCEPTION }),
        );
    });
  }
}
