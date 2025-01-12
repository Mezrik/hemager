import { injectable } from 'inversify';
import { Repository, Sequelize } from 'sequelize-typescript';
import { CompetitionRepository as CompetitionRepositoryInterface } from 'domain/competition/competition-repository';
import { Competition } from 'domain/competition/competition';

import { Competition as CompetitionModel } from '../models/competition.model';
import { plainToInstance } from 'class-transformer';
import { BaseRepository } from '../base-repository';

@injectable()
export class CompetitionRepository
  extends BaseRepository<CompetitionModel, Competition>
  implements CompetitionRepositoryInterface {}
