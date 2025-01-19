import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { RoundParticipant as RoundParticipantEntity } from '@/domain/round/round-participant';

import { Contestant, contestantModelToEntity } from './contestant.model';
import { Round } from './round.model';

@Table({ tableName: 'RoundParticipant', modelName: 'RoundParticipant' })
export class RoundParticipant extends Model {
  @PrimaryKey
  @ForeignKey(() => Round)
  @Column(DataType.UUID)
  roundId: string;

  @PrimaryKey
  @ForeignKey(() => Contestant)
  @Column(DataType.UUID)
  contestantId: string;

  @BelongsTo(() => Contestant)
  contestant: Contestant;

  @BelongsTo(() => Round)
  round: Round;
}

export const roundParticipantsModelToEntity = (model: RoundParticipant): RoundParticipantEntity => {
  return new RoundParticipantEntity(model.roundId, contestantModelToEntity(model.contestant));
};

export const entityToRoundParticipantsAttributes = (entity: RoundParticipantEntity) => {
  const model = {
    roundId: entity.roundId,
    contestantId: entity.contestant.id,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };

  return model;
};
