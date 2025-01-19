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
  constructor(@inject(TYPES.Db) _db: Sequelize) {
    super(_db, GroupModel, Group, groupModelToEntity, entityToGroupAttributes);
  }
}
