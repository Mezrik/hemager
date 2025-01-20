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
import { Group } from './group.model';

@Table({ tableName: 'GroupParticipant', modelName: 'GroupParticipant' })
export class GroupParticipant extends Model {
  @PrimaryKey
  @ForeignKey(() => Group)
  @Column(DataType.UUID)
  public groupId: string;

  @PrimaryKey
  @ForeignKey(() => Contestant)
  @Column(DataType.UUID)
  contestantId: string;

  @BelongsTo(() => Contestant)
  contestant: Contestant;

  @BelongsTo(() => Group)
  group: Group;
}
