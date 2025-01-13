import { inject, injectable } from 'inversify';
import { Repository, Sequelize } from 'sequelize-typescript';
import { CompetitionRepository as CompetitionRepositoryInterface } from '@/domain/competition/competition-repository';
import { Competition } from '@/domain/competition/competition';

import { Competition as CompetitionModel } from '../models/competition.model.js';
import { plainToInstance } from 'class-transformer';
import { BaseRepository } from '../base-repository.js';
import { TYPES } from '@/di-types.js';

@injectable()
export class CompetitionRepository
  extends BaseRepository<CompetitionModel, Competition>
  implements CompetitionRepositoryInterface
{
  constructor(@inject(TYPES.Db) db: Sequelize) {
    super(db, CompetitionModel, Competition);
  }
}
