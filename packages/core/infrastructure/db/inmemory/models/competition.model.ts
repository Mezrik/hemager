import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class Competition extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  declare public id: string;

  @Column
  name: string;

  @Column
  organizerName: string;

  @Column
  federationName: string;

  @Column
  competitionType: string;

  @Column
  gender: string;

  @Column
  date: Date;
}
