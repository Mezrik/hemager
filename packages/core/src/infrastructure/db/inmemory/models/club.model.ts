import { Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Contestant } from './contestant.model';

@Table({ tableName: 'Club', modelName: 'Club' })
export class Club extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  declare public id: string;

  @Column(DataType.TEXT)
  name: string;

  @HasMany(() => Contestant)
  contestants: Contestant[];
}
