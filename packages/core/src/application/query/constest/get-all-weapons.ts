import { inject } from 'inversify';

import { Query, QueryHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { ContestRepository } from '@/domain/contest/contest-repository';
import { Weapon } from '@/domain/contest/weapon';

export class GetAllWeaponsQuery implements Query {}

export class GetAllWeaponsQueryHandler implements QueryHandler<GetAllWeaponsQuery, Weapon[]> {
  queryToHandle = GetAllWeaponsQuery.name;

  constructor(@inject(TYPES.ContestRepository) private readonly _repository: ContestRepository) {}

  async execute() {
    const weapons = await this._repository.getAllWeapons();
    return weapons;
  }
}
