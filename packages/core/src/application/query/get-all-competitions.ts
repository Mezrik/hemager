import { Query, QueryHandler } from '@/common/interfaces';
import { CompetitionRepository } from '@/domain/competition/competition-repository';
import { TYPES } from '@/di-types';
import { inject } from 'inversify';

export class GetAllCompetitionsQuery implements Query {}

export class GetAllCompetitionsQueryHandler implements QueryHandler<GetAllCompetitionsQuery> {
  queryToHandle = GetAllCompetitionsQuery.name;

  constructor(
    @inject(TYPES.CompetitionRepository) private readonly _repository: CompetitionRepository,
  ) {}

  async execute() {
    const competitions = await this._repository.findAll();
    return competitions;
  }
}
