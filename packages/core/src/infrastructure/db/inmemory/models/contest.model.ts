import { ContestTypeEnum, DeploymentCriteria, GenderEnum } from '@hemager/api-types';
import { plainToInstance } from 'class-transformer';
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { ContestCategory as ContestCategoryEntity } from '@/domain/contest/category';
import { Contest as ContestEntity } from '@/domain/contest/contest';
import { Weapon as WeaponEntity } from '@/domain/contest/weapon';
import { Round as RoundEntity } from '@/domain/round/round';

import { ContestCategory } from './contest-category.model';
import { Referee } from './referee.model';
import { Round } from './round.model.ts';
import { Weapon } from './weapon.model.ts';

@Table({ tableName: 'Contest', modelName: 'Contest' })
export class Contest extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  public id: string;

  @Column(DataType.TEXT)
  name: string;

  @AllowNull
  @Column(DataType.TEXT)
  organizerName?: string;

  @AllowNull
  @Column(DataType.TEXT)
  federationName?: string;

  @AllowNull
  @Column(DataType.ENUM('national', 'international'))
  contestType?: ContestTypeEnum;

  @AllowNull
  @Column(DataType.ENUM('male', 'female', 'mixed'))
  gender?: GenderEnum;

  @Column(DataType.DATE)
  date: Date;

  @AllowNull
  @ForeignKey(() => ContestCategory)
  @Column(DataType.UUID)
  categoryId?: string;

  @BelongsTo(() => ContestCategory)
  category?: ContestCategory;

  @AllowNull
  @ForeignKey(() => Weapon)
  @Column(DataType.UUID)
  weaponId?: string;

  @BelongsTo(() => Weapon)
  weapon?: Weapon;

  @AllowNull
  @Column(DataType.INTEGER)
  expectedParticipants?: number;

  @AllowNull
  @Column(DataType.INTEGER)
  groupHits?: number;

  @AllowNull
  @Column(DataType.INTEGER)
  eliminationHits?: number;

  @AllowNull
  @Column(DataType.JSON)
  deploymentCriteria?: string[];

  @HasMany(() => Referee)
  referees: Referee[];

  @HasMany(() => Round)
  rounds: Round[];
}

export const contestModelToEntity = (model: Contest): ContestEntity => {
  const properties = {
    name: model.name,
    date: model.date,
    organizerName: model.organizerName,
    federationName: model.federationName,
    contestType: model.contestType,
    gender: model.gender,
    expectedParticipants: model.expectedParticipants,
    deploymentCriteria: model.deploymentCriteria as DeploymentCriteria[],
    groupHits: model.groupHits,
    eliminationHits: model.eliminationHits,
    weapon: model.weapon
      ? plainToInstance(WeaponEntity, model.weapon.dataValues as Model)
      : undefined,
    category: model.category
      ? plainToInstance(ContestCategoryEntity, model.category.dataValues as Model)
      : undefined,
    rounds: model.rounds
      ? model.rounds.map((round) => plainToInstance(RoundEntity, round.dataValues as Model))
      : [],
  };

  return new ContestEntity(properties, { id: model.id });
};

export const entityToAttributes = (entity: ContestEntity) => {
  const model = {
    id: entity.id,
    name: entity.name,
    date: entity.date,
    organizerName: entity.organizerName,
    federationName: entity.federationName,
    contestType: entity.contestType,
    gender: entity.gender,
    expectedParticipants: entity.expectedParticipants,
    deploymentCriteria: entity.deploymentCriteria,
    groupHits: entity.groupHits,
    eliminationHits: entity.eliminationHits,
    weapon: entity.weapon ? entity.weapon : undefined,
    category: entity.category ? entity.category : undefined,
    rounds: entity.rounds ? entity.rounds : [],
  };

  return model;
};
