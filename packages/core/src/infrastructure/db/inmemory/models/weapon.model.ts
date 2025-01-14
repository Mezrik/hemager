import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'Weapon', modelName: 'Weapon' })
export class Weapon extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  declare public id: string;

  @Column(DataType.TEXT)
  name: string;
}
