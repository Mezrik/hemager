import { ContestTypeEnum, GenderEnum } from '@/common/enums';
import { AllowNull, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'Contest', modelName: 'Contest' })
export class Contest extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  declare public id: string;

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
}
