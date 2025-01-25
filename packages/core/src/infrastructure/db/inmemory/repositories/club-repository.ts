import { inject, injectable } from 'inversify';
import { Sequelize } from 'sequelize-typescript';

import { TYPES } from '@/di-types';
import { Club } from '@/domain/contestant/club';
import { ClubRepository as ClubRepositoryInterface } from '@/domain/contestant/club-repository';

import { BaseRepository } from '../base-repository';
import { Club as ClubModel, clubModelToEntity, entityToClubAttributes } from '../models/club.model';

@injectable()
export class ClubRepository
  extends BaseRepository<ClubModel, Club>
  implements ClubRepositoryInterface
{
  constructor(@inject(TYPES.Db) private _db: Sequelize) {
    super(_db, ClubModel, Club, clubModelToEntity, entityToClubAttributes);
  }
}
