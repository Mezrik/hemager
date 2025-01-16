import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { GenderEnum } from '@hemager/api-types';

import { Club } from './club.model';

@Table({ tableName: 'Contestant', modelName: 'Contestant' })
export class Contestant extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.TEXT)
  firstname: string;

  @Column(DataType.TEXT)
  surname: string;

  @AllowNull
  @ForeignKey(() => Club)
  @Column(DataType.UUID)
  clubId?: string;

  @BelongsTo(() => Club)
  club?: Club;

  @AllowNull
  @Column(DataType.DATE)
  birthdate?: Date;

  @AllowNull
  @Column(DataType.ENUM('male', 'female', 'mixed'))
  gender?: GenderEnum;

  @AllowNull
  @Column(DataType.INTEGER)
  rating?: number;
}
