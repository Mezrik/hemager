import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Group } from './group.model';
import { MatchParticipant } from './match-participant.model';
import { MatchState } from './match-state.model';

@Table({ tableName: 'Match', modelName: 'Match' })
export class Match extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  declare public id: string;

  @ForeignKey(() => Group)
  @Column(DataType.UUID)
  declare public groupId: string;

  @HasMany(() => MatchParticipant)
  participants: [MatchParticipant, MatchParticipant];

  @HasMany(() => MatchState)
  states: MatchState[];
}
