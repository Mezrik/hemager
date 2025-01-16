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
  constructor(@inject(TYPES.Db) _db: Sequelize) {
    super(_db, RoundModel, Round, roundModelToEntity, entityToRoundAttributes);
  }
}
