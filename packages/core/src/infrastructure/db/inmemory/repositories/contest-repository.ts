import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'inversify';
import { Repository, Sequelize } from 'sequelize-typescript';

import { TYPES } from '@/di-types.js';
import { ContestRepository as ContestRepositoryInterface } from '@/domain/contest/contest-repository.js';
import { Contest } from '@/domain/contest/contest.js';

import { BaseRepository } from '../base-repository.js';
import { Contest as ContestModel } from '../models/contest.model.js';

@injectable()
export class ContestRepository
  extends BaseRepository<ContestModel, Contest>
  implements ContestRepositoryInterface
{
  constructor(@inject(TYPES.Db) db: Sequelize) {
    super(db, ContestModel, Contest);
  }
}
