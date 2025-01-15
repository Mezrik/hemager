import { inject } from 'inversify';

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

  async execute() {
    const categories = await this._repository.getAllCategories();
    return categories;
  }
}
