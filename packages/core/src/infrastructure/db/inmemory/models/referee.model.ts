import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Contest } from './contest.model';
import { Group } from './group.model';
import { Round } from './round.model';

@Table({ tableName: 'Referee', modelName: 'Referee' })
export class Referee extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  public declare id: string;

  @Column(DataType.TEXT)
  name: string;

  @ForeignKey(() => Contest)
  @Column(DataType.UUID)
  contestId: string;

  @BelongsTo(() => Contest)
  contest: Contest;

  @HasMany(() => Group)
  groups: Group[];
}
