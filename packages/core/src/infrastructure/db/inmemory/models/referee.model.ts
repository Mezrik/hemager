import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Referee as RefereeEntity } from '@/domain/contest/referee';

import { Contest } from './contest.model';
import { Group } from './group.model';
import { Round } from './round.model';

@Table({ tableName: 'Referee', modelName: 'Referee' })
export class Referee extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  public id: string;

  @Column(DataType.TEXT)
  name: string;

  @ForeignKey(() => Contest)
  @Column(DataType.UUID)
  contestId: string;

  @BelongsTo(() => Contest)
  contest: Contest;

  @HasMany(() => Group)
  groups: Group[];
}

export const refereeModelToEntity = (model: Referee): RefereeEntity => {
  return new RefereeEntity(model.name, model.contestId, { id: model.id });
};

export const entityToRefereeAttributes = (entity: RefereeEntity) => {
  const model = {
    id: entity.id,
    name: entity.name,
    contestId: entity.contestId,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };

  return model;
};
