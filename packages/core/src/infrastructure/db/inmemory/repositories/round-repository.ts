import { inject, injectable } from 'inversify';
import { Sequelize } from 'sequelize-typescript';

import { TYPES } from '@/di-types';
import { Round } from '@/domain/round/round';
import { RoundRepository as RoundRepositoryInterface } from '@/domain/round/round-repository';

import { BaseRepository } from '../base-repository';
import {
  entityToRoundAttributes,
  Round as RoundModel,
  roundModelToEntity,
} from '../models/round.model';

@injectable()
export class RoundRepository
  extends BaseRepository<RoundModel, Round>
  implements RoundRepositoryInterface
{
  constructor(@inject(TYPES.Db) private _db: Sequelize) {
    super(_db, RoundModel, Round, roundModelToEntity, entityToRoundAttributes);
  }

  public async findByContestId(contestId: string): Promise<Round[]> {
    const repo = this._db.getRepository(RoundModel);

    const rounds = await repo.findAll({
      where: { contestId },
    });

    return rounds.map((round) => this._modelToEntity(round));
  }
}
