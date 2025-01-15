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

import { Contest } from './contest.model';
import { Group } from './group.model';
import { RoundParticipant } from './round-participant.model';

@Table({ tableName: 'Round', modelName: 'Round' })
export class Round extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  public declare id: string;

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
