import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'RoundResultAggregated', // this is a dummy name; the mapping is for query results
  timestamps: false,
  freezeTableName: true, // prevents automatic pluralization
})
export class RoundResultAggregated extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  surname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  contestantId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  roundId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  contestId: string;

  // This field maps to the COUNT(*) result from your query.
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'totalContests', // ensures mapping if column name in query result differs from property name
  })
  totalContests: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  winCount: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  contestPointsFor: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  contestPointsAgainst: number;
}
