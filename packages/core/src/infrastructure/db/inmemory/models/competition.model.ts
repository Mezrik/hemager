import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'Competition', modelName: 'Competition' })
export class Competition extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  declare public id: string;

  @Column(DataType.TEXT)
  name: string;

  @Column(DataType.TEXT)
  organizerName: string;

  @Column(DataType.TEXT)
  federationName: string;

  @Column(DataType.TEXT)
  competitionType: string;

  @Column(DataType.TEXT)
  gender: string;

  @Column(DataType.DATE)
  date: Date;
}
