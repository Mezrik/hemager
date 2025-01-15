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

import { ContestTypeEnum, GenderEnum } from '@/common/enums';

import { ContestCategory } from './contest-category.model';
import { Referee } from './referee.model';
import { Weapon } from './weapon.model.ts';

@Table({ tableName: 'Contest', modelName: 'Contest' })
export class Contest extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  public declare id: string;

  @Column(DataType.TEXT)
  name: string;

  @AllowNull
  @Column(DataType.TEXT)
  organizerName?: string;

  @AllowNull
  @Column(DataType.TEXT)
  federationName?: string;

  @AllowNull
  @Column(DataType.ENUM('national', 'international'))
  contestType?: ContestTypeEnum;

  @AllowNull
  @Column(DataType.ENUM('male', 'female', 'mixed'))
  gender?: GenderEnum;

  @Column(DataType.DATE)
  date: Date;

  @AllowNull
  @ForeignKey(() => ContestCategory)
  @Column(DataType.UUID)
  categoryId?: string;

  @BelongsTo(() => ContestCategory)
  category?: ContestCategory;

  @AllowNull
  @ForeignKey(() => Weapon)
  @Column(DataType.UUID)
  weaponId?: string;

  @BelongsTo(() => Weapon)
  weapon?: Weapon;

  @AllowNull
  @Column(DataType.INTEGER)
  expectedParticipants?: number;

  @AllowNull
  @Column(DataType.INTEGER)
  groupHits?: number;

  @AllowNull
  @Column(DataType.INTEGER)
  eliminationHits?: number;

  @AllowNull
  @Column(DataType.JSON)
  deploymentCriteria?: string[];

  @HasMany(() => Referee)
  referees: Referee[];
}
