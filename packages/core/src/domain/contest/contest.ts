import { ContestTypeEnum, DeploymentCriteria, GenderEnum } from '@hemager/api-types';
import { Expose, Transform } from 'class-transformer';

import { Entity, EntityProperties } from '@/common/entity';

import { Round } from '../round/round';

import { ContestCategory } from './category';
import { Weapon } from './weapon';

type ContestProperties = {
  name: string;
  date: Date;

  organizerName?: string;
  federationName?: string;
  contestType?: ContestTypeEnum;
  gender?: GenderEnum;

  expectedParticipants?: number;
  deploymentCriteria?: DeploymentCriteria[];

  groupHits?: number;
  eliminationHits?: number;
};

export class Contest extends Entity {
  private _weapon?: Weapon;
  private _category?: ContestCategory;
  private _rounds: Round[];

  constructor(
    private _properties: ContestProperties & {
      weapon?: Weapon | null;
      category?: ContestCategory | null;
      rounds?: Round[];
    },
    _entityProperties?: EntityProperties,
  ) {
    super(_entityProperties);

    this._weapon = _properties.weapon ?? undefined;
    this._category = _properties.category ?? undefined;
    this._rounds = _properties.rounds || [];

    if (this._rounds.length <= 0) {
      this.addRound();
    }
  }

  @Expose()
  get name() {
    return this._properties.name;
  }

  set name(name: string) {
    this._properties.name = name;
  }

  @Expose()
  get date() {
    return this._properties.date;
  }

  set date(date: Date) {
    this._properties.date = date;
  }

  @Expose()
  get organizerName() {
    return this._properties.organizerName;
  }

  set organizerName(organizerName: string | undefined) {
    this._properties.organizerName = organizerName;
  }

  @Expose()
  get federationName() {
    return this._properties.federationName;
  }

  set federationName(federationName: string | undefined) {
    this._properties.federationName = federationName;
  }

  @Expose()
  get contestType() {
    return this._properties.contestType;
  }

  set contestType(contestType: ContestTypeEnum | undefined) {
    this._properties.contestType = contestType;
  }

  @Expose()
  get gender() {
    return this._properties.gender;
  }

  set gender(gender: GenderEnum | undefined) {
    this._properties.gender = gender;
  }

  set weapon(weapon: Weapon | undefined) {
    this._weapon = weapon;
  }

  set category(category: ContestCategory | undefined) {
    this._category = category;
  }

  set rounds(rounds: Round[]) {
    this._rounds = rounds;
  }

  @Expose()
  get weapon() {
    return this._weapon;
  }

  @Expose()
  get category() {
    return this._category;
  }

  @Expose()
  get expectedParticipants() {
    return this._properties.expectedParticipants;
  }

  @Expose()
  get deploymentCriteria() {
    return this._properties.deploymentCriteria;
  }

  @Expose()
  get groupHits() {
    return this._properties.groupHits;
  }

  @Expose()
  get eliminationHits() {
    return this._properties.eliminationHits;
  }

  @Expose()
  get rounds() {
    return this._rounds;
  }

  @Expose()
  get groupsCanBeCreated() {
    return (
      !!this._properties.deploymentCriteria?.length &&
      !!this._properties.expectedParticipants &&
      !!this._properties.groupHits &&
      !!this._properties.eliminationHits
    );
  }

  update<K extends keyof ContestProperties>(key: K, value: ContestProperties[K]) {
    this._properties[key] = value;
  }

  addRound(): Round {
    const round = new Round(this.id);

    this._rounds.push(round);

    return round;
  }
}
