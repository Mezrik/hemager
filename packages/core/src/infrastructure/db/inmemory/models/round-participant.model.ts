import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Contestant } from './contestant.model';
import { Round } from './round.model';

@Table({ tableName: 'RoundParticipant', modelName: 'RoundParticipant' })
export class RoundParticipant extends Model {
  @PrimaryKey
  @ForeignKey(() => Round)
  @Column(DataType.UUID)
  roundId: string;

  @PrimaryKey
  @ForeignKey(() => Contestant)
  @Column(DataType.UUID)
  contestantId: string;

  @BelongsTo(() => Contestant)
  contestant: Contestant;

  @BelongsTo(() => Round)
  round: Round;
}
