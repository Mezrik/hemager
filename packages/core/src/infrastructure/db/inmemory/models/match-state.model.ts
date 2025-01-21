import { MatchStateChange } from '@hemager/api-types';
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { MatchState as MatchStateEntity } from '@/domain/match/match-state';

import { Contestant } from './contestant.model';
import { Match } from './match.model';

@Table({ tableName: 'MatchState', modelName: 'MatchState' })
export class MatchState extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => Match)
  @Column(DataType.UUID)
  matchId: string;

  @BelongsTo(() => Match)
  match: Match;

  @Column(
    DataType.ENUM(
      'matchStart',
      'matchEnd',
      'fightStart',
      'fightStop',
      'pointAdded',
      'pointSubtracted',
    ),
  )
  change: MatchStateChange;

  @AllowNull
  @ForeignKey(() => Contestant)
  @Column(DataType.UUID)
  pointToContestantId?: string;

  @AllowNull
  @Column(DataType.INTEGER)
  points?: number;

  @BelongsTo(() => Contestant)
  pointToContestant: Contestant;
}

export const matchStateModelToEntity = (model: MatchState): MatchStateEntity => {
  return new MatchStateEntity(
    model.change,
    model.matchId,
    model.pointToContestantId,
    model.points,
    {
      id: model.id,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    },
  );
};

export const entityToMatchStateAttributes = (entity: MatchStateEntity) => {
  const model = {
    id: entity.id,
    matchId: entity.matchId,
    change: entity.change,
    pointToContestantId: entity.pointToContestantId,
    points: entity.points,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };

  return model;
};
