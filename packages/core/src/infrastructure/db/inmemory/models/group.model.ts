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
import { Round } from './round.model';
import { Referee } from './referee.model';
import { GroupParticipant } from './group-participant.model';

@Table({ tableName: 'Group', modelName: 'Group' })
export class Group extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  declare public id: string;

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
