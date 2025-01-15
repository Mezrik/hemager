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

import { GroupParticipant } from './group-participant.model';
import { Referee } from './referee.model';
import { Round } from './round.model';

@Table({ tableName: 'Group', modelName: 'Group' })
export class Group extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  public declare id: string;

  @ForeignKey(() => Round)
  @Column(DataType.UUID)
  roundId: string;

  @BelongsTo(() => Round)
  round: Round;

  @ForeignKey(() => Referee)
  @Column(DataType.UUID)
  refereeId: string;

  @BelongsTo(() => Referee)
  referee: Referee;

  @HasMany(() => GroupParticipant)
  participants: GroupParticipant[];
}
