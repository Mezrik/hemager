import { inject } from 'inversify';

import { Query, QueryHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { Contest } from '@/domain/contest/contest';
import { ContestRepository } from '@/domain/contest/contest-repository';

export class GetContestQuery implements Query {
  constructor(public id: string) {}
}

export class GetContestQueryHandler implements QueryHandler<GetContestQuery, Contest> {
  queryToHandle = GetContestQuery.name;

  constructor(@inject(TYPES.ContestRepository) private readonly _repository: ContestRepository) {}

  async execute(query: GetContestQuery): Promise<Contest> {
    const contest = await this._repository.findOne(query);

    if (!contest) {
      throw new Error('Contest not found');
    }

    return contest;
  }
}
