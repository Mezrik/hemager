import { inject, injectable } from 'inversify';
import { Sequelize } from 'sequelize-typescript';

import { TYPES } from '@/di-types';
import { Match } from '@/domain/match/match';
import { MatchRepository as MatchRepositoryInterface } from '@/domain/match/match-repository';

import { BaseRepository } from '../base-repository';
import {
  entityToMatchAttributes,
  matchModelToEntity,
  Match as MatchModel,
} from '../models/match.model';

@injectable()
export class MatchRepository
  extends BaseRepository<MatchModel, Match>
  implements MatchRepositoryInterface
{
  constructor(@inject(TYPES.Db) private _db: Sequelize) {
    super(_db, MatchModel, Match, matchModelToEntity, entityToMatchAttributes);
  }

  async findByGroupId(groupId: string): Promise<Match[]> {
    const repo = this._db.getRepository(MatchModel);

    const groups = await repo.findAll({ where: { groupId } });

    return groups.map((group) => this._modelToEntity(group));
  }
}
