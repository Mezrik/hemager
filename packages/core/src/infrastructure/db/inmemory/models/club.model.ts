import { Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';

import { Club as ClubEntity } from '@/domain/contestant/club';

import { Contestant } from './contestant.model';

@Table({ tableName: 'Club', modelName: 'Club' })
export class Club extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  public id: string;

  @Column(DataType.TEXT)
  name: string;

  @HasMany(() => Contestant)
  contestants: Contestant[];
}

export const clubModelToEntity = (model: Club): ClubEntity => {
  return new ClubEntity(model.name, {
    id: model.id,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  });
};

export const entityToClubAttributes = (entity: ClubEntity) => {
  const model = {
    id: entity.id,
    name: entity.name,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };

  return model;
};
