import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Contestant } from './contestant.model';
import { Match } from './match.model';

@Table({ tableName: 'MatchParticipant', modelName: 'MatchParticipant' })
export class MatchParticipant extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @ForeignKey(() => Match)
  @Column(DataType.UUID)
  matchId: string;

  @ForeignKey(() => Contestant)
  @Column(DataType.UUID)
  contestantId: string;

  @BelongsTo(() => Contestant)
  contestant: Contestant;

  @BelongsTo(() => Match)
  match: Match;
}
