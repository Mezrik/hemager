import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Match as MatchEntity } from '@/domain/match/match';
import { RoundParticipant } from '@/domain/round/round-participant';

import { contestantModelToEntity } from './contestant.model';
import { Group } from './group.model';
import { MatchParticipant } from './match-participant.model';
import { MatchState, matchStateModelToEntity } from './match-state.model';

@Table({ tableName: 'Match', modelName: 'Match' })
export class Match extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  public id: string;

  @ForeignKey(() => Group)
  @Column(DataType.UUID)
  public groupId: string;

  @HasMany(() => MatchParticipant)
  participants: [MatchParticipant, MatchParticipant];

  @HasMany(() => MatchState)
  states?: MatchState[];
}

export const matchModelToEntity = (model: Match): MatchEntity => {
  return new MatchEntity(
    model.groupId,
    [
      new RoundParticipant(model.id, contestantModelToEntity(model.participants[0].contestant)),
      new RoundParticipant(model.id, contestantModelToEntity(model.participants[1].contestant)),
    ],
    model.states?.map((state) => matchStateModelToEntity(state)),
    {
      id: model.id,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    },
  );
};

export const entityToMatchAttributes = (entity: MatchEntity) => {
  const model = {
    id: entity.id,
    groupId: entity.groupId,
    states: entity.matchStates,
    participants: entity.participants,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };

  return model;
};
