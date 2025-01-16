import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'inversify';
import { Sequelize } from 'sequelize-typescript';

import { TYPES } from '@/di-types';
import { ContestCategory } from '@/domain/contest/category';
import { Contest } from '@/domain/contest/contest';
import { ContestRepository as ContestRepositoryInterface } from '@/domain/contest/contest-repository';
import { Weapon } from '@/domain/contest/weapon';
import { ContestCategory as ContestCategoryModel } from '@/infrastructure/db/inmemory/models/contest-category.model';
import {
  Contest as ContestModel,
  contestModelToEntity,
  entityToAttributes,
} from '@/infrastructure/db/inmemory/models/contest.model';
import { Weapon as WeaponModel } from '@/infrastructure/db/inmemory/models/weapon.model';

import { BaseRepository } from '../base-repository';

@injectable()
export class ContestRepository
  extends BaseRepository<ContestModel, Contest>
  implements ContestRepositoryInterface
{
  constructor(@inject(TYPES.Db) private _db: Sequelize) {
    super(_db, ContestModel, Contest, contestModelToEntity, entityToAttributes);
  }

  async getWeapon(id: string): Promise<Weapon> {
    const repo = this._db.getRepository(WeaponModel);

    const result = await repo.findOne({ where: { id } });

    return plainToInstance(Weapon, result);
  }
  async getAllWeapons(): Promise<Weapon[]> {
    const repo = this._db.getRepository(WeaponModel);

    return await repo.findAll().then((items) => items.map((item) => plainToInstance(Weapon, item)));
  }
  async getCategory(id: string): Promise<ContestCategory> {
    const repo = this._db.getRepository(ContestCategoryModel);

    const result = await repo.findOne({ where: { id } });

    return plainToInstance(ContestCategory, result);
  }
  async getAllCategories(): Promise<ContestCategory[]> {
    const repo = this._db.getRepository(ContestCategoryModel);

    return await repo
      .findAll()
      .then((items) => items.map((item) => plainToInstance(ContestCategory, item)));
  }
}
