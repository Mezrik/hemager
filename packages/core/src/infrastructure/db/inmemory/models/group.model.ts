import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Group as GroupEntity } from '@/domain/group/group';
import { RoundParticipant } from '@/domain/round/round-participant';

import { contestantModelToEntity } from './contestant.model';
import { GroupParticipant } from './group-participant.model';
import { Referee, refereeModelToEntity } from './referee.model';
import { Round } from './round.model';

@Table({ tableName: 'Group', modelName: 'Group' })
export class Group extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  public id: string;

  @ForeignKey(() => Round)
  @Column(DataType.UUID)
  roundId: string;

  @BelongsTo(() => Round)
  round: Round;

  @AllowNull
  @ForeignKey(() => Referee)
  @Column(DataType.UUID)
  refereeId?: string;

  @BelongsTo(() => Referee)
  referee?: Referee;

  @HasMany(() => GroupParticipant, /* foreign key */ 'groupId')
  participants: GroupParticipant[];
}

export const groupModelToEntity = (model: Group): GroupEntity => {
  return new GroupEntity(
    model.roundId,
    model.participants?.map((participant) => {
      return new RoundParticipant(model.roundId, contestantModelToEntity(participant.contestant));
    }),
    model.referee ? refereeModelToEntity(model.referee) : undefined,
    {
      id: model.id,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    },
  );
};

export const entityToGroupAttributes = (entity: GroupEntity) => {
  const model = {
    id: entity.id,
    roundId: entity.roundId,
    refereeId: entity.referee ? entity.referee.id : undefined,
    participants: entity.participants,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };

  return model;
};
