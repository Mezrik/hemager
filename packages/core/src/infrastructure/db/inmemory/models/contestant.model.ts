import { Country, GenderEnum } from '@hemager/api-types';
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Contestant as ContestantEntity } from '@/domain/contestant/contestant';

import { Club, clubModelToEntity } from './club.model';

@Table({ tableName: 'Contestant', modelName: 'Contestant' })
export class Contestant extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.TEXT)
  firstname: string;

  @Column(DataType.TEXT)
  surname: string;

  @AllowNull
  @ForeignKey(() => Club)
  @Column(DataType.UUID)
  clubId?: string;

  @BelongsTo(() => Club)
  club?: Club;

  @AllowNull
  @Column(DataType.DATE)
  birthdate?: Date;

  @AllowNull
  @Column(DataType.ENUM('male', 'female', 'mixed'))
  gender?: GenderEnum;

  @AllowNull
  @Column(DataType.INTEGER)
  rating?: number;

  @AllowNull
  @Column(DataType.STRING)
  nationality?: Country;
}

export const contestantModelToEntity = (model: Contestant): ContestantEntity => {
  console.log(model.club, model.clubId);
  return new ContestantEntity(
    {
      firstname: model.firstname,
      surname: model.surname,
      club: model.club ? clubModelToEntity(model.club.dataValues) : undefined,
      birthdate: model.birthdate,
      gender: model.gender,
      rating: model.rating,
      nationality: model.nationality,
    },
    {
      id: model.id,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    },
  );
};

export const entityToContestantAttributes = (entity: ContestantEntity) => {
  const model = {
    id: entity.id,
    firstname: entity.firstname,
    surname: entity.surname,
    clubId: entity.club ? entity.club.id : undefined,
    birthdate: entity.birthdate,
    gender: entity.gender,
    rating: entity.rating,
    nationality: entity.nationality,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };

  return model;
};
