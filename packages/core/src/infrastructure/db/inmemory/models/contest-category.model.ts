import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'ContestCategory', modelName: 'ContestCategory' })
export class ContestCategory extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  public declare id: string;

  @Column(DataType.TEXT)
  name: string;
}
