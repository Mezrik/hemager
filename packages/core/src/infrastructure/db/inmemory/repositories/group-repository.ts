import { inject, injectable } from 'inversify';
import { Sequelize } from 'sequelize-typescript';

import { TYPES } from '@/di-types';
import { Group } from '@/domain/group/group';
import { GroupRepository as GroupRepositoryInterface } from '@/domain/group/group-repository';

import { BaseRepository } from '../base-repository';
import {
  entityToGroupAttributes,
  Group as GroupModel,
  groupModelToEntity,
} from '../models/group.model';

@injectable()
export class GroupRepository
  extends BaseRepository<GroupModel, Group>
  implements GroupRepositoryInterface
{
  constructor(@inject(TYPES.Db) private _db: Sequelize) {
    super(_db, GroupModel, Group, groupModelToEntity, entityToGroupAttributes);
  }

  async findByRoundId(roundId: string): Promise<Group[]> {
    const repo = this._db.getRepository(GroupModel);

    const groups = await repo.findAll({ where: { roundId } });

    return groups.map((group) => this._modelToEntity(group));
  }
}
