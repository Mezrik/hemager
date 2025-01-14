import { Query, QueryHandler } from '@/common/interfaces';
import { ContestRepository } from '@/domain/contest/contest-repository';
import { TYPES } from '@/di-types';
import { inject } from 'inversify';

export class GetAllContestsQuery implements Query {}

export class GetAllContestsQueryHandler implements QueryHandler<GetAllContestsQuery> {
  queryToHandle = GetAllContestsQuery.name;

  constructor(@inject(TYPES.ContestRepository) private readonly _repository: ContestRepository) {}

  async execute() {
    const contests = await this._repository.findAll();
    return contests;
  }
}
