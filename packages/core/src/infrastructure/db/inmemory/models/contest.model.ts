import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'Contest', modelName: 'Contest' })
export class Contest extends Model {
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
  contestType: string;

  @Column(DataType.TEXT)
  gender: string;

  @Column(DataType.DATE)
  date: Date;
}
