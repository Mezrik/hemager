import { inject } from 'inversify';

import { Query, QueryHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { Contest } from '@/domain/contest/contest';
import { ContestRepository } from '@/domain/contest/contest-repository';

export class GetAllContestsQuery implements Query {}

export class GetAllContestsQueryHandler implements QueryHandler<GetAllContestsQuery, Contest[]> {
  queryToHandle = GetAllContestsQuery.name;

  constructor(@inject(TYPES.ContestRepository) private readonly _repository: ContestRepository) {}

  async execute() {
    const contests = await this._repository.findAll();
    console.log(contests);
    return contests;
  }
}
