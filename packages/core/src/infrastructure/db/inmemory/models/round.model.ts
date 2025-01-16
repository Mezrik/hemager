import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Round as RoundEntity } from '@/domain/round/round';

import { Contest } from './contest.model';
import { Group } from './group.model';
import { RoundParticipant } from './round-participant.model';

@Table({ tableName: 'Round', modelName: 'Round' })
export class Round extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  public id: string;

  @ForeignKey(() => Contest)
  @Column(DataType.UUID)
  contestId: string;

  @BelongsTo(() => Contest)
  contest: Contest;

  @ForeignKey(() => Round)
  @Column(DataType.UUID)
  previousRoundId?: string;

  @HasOne(() => Round)
  previousRound: Round;

  @HasMany(() => Group)
  groups: Group[];

  @HasMany(() => RoundParticipant)
  participants: RoundParticipant[];
}

export const roundModelToEntity = (model: Round): RoundEntity => {
  return new RoundEntity(model.contestId, undefined, undefined, { id: model.id });
};

export const entityToRoundAttributes = (entity: RoundEntity) => {
  const model = {
    id: entity.id,
    contestId: entity.contestId,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };

  return model;
};
