import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'inversify';
import { Sequelize } from 'sequelize-typescript';

import { TYPES } from '@/di-types';
import { Club } from '@/domain/contestant/club';
import { Contestant } from '@/domain/contestant/contestant';
import { ContestantRepository as ContestantRepositoryInterface } from '@/domain/contestant/contestant-repository';

import { BaseRepository } from '../base-repository';
import { Club as ClubModel } from '../models/club.model';
import {
  Contestant as ContestantModel,
  contestantModelToEntity,
  entityToContestantAttributes,
} from '../models/contestant.model';

@injectable()
export class ContestantRepository
  extends BaseRepository<ContestantModel, Contestant>
  implements ContestantRepositoryInterface
{
  constructor(@inject(TYPES.Db) private _db: Sequelize) {
    super(_db, ContestantModel, Contestant, contestantModelToEntity, entityToContestantAttributes);
  }

  async findByClubId(id: string): Promise<Club> {
    const repo = this._db.getRepository(ClubModel);

    const result = await repo.findOne({ where: { id } });

    return plainToInstance(Club, result);
  }
}
