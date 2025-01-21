import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Contestant } from './contestant.model';
import { Match } from './match.model';
import { Group } from './group.model';

@Table({ tableName: 'GroupMatchResult', modelName: 'GroupMatchResult' })
export class GroupMatchResult extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => Match)
  @Column(DataType.UUID)
  matchId: string;

  @ForeignKey(() => Contestant)
  @Column(DataType.UUID)
  contestantId: string;

  @ForeignKey(() => Group)
  @Column(DataType.UUID)
  groupId: string;

  @BelongsTo(() => Contestant)
  contestant: Contestant;

  @BelongsTo(() => Match)
  match: Match;

  @BelongsTo(() => Group)
  group: Group;

  @Column(DataType.INTEGER)
  pointsFor: number;

  @Column(DataType.INTEGER)
  pointsAgainst: number;
}
