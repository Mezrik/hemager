import { Expose, Transform } from 'class-transformer';

import { Entity, EntityProperties } from '@/common/entity';
import { ContestTypeEnum, DeploymentCriteria, GenderEnum } from '@hemager/api-types';

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
  _weapon?: Weapon;
  _category?: ContestCategory;
  _rounds: Round[];

  constructor(
    private _properties: ContestProperties & {
      weapon?: Weapon;
      category?: ContestCategory;
      rounds?: Round[];
    },
    _entityProperties?: EntityProperties,
  ) {
    super(_entityProperties);

    this._weapon = _properties.weapon;
    this._category = _properties.category;
    this._rounds = _properties.rounds || [];

    if (this._rounds.length <= 0) {
      this.addRound();
    }
  }

  get name() {
    return this._properties.name;
  }

  set name(name: string) {
    this._properties.name = name;
  }

  get date() {
    return this._properties.date;
  }

  set date(date: Date) {
    this._properties.date = date;
  }

  get organizerName() {
    return this._properties.organizerName;
  }

  set organizerName(organizerName: string | undefined) {
    this._properties.organizerName = organizerName;
  }

  get federationName() {
    return this._properties.federationName;
  }

  set federationName(federationName: string | undefined) {
    this._properties.federationName = federationName;
  }

  get contestType() {
    return this._properties.contestType;
  }

  set contestType(contestType: ContestTypeEnum | undefined) {
    this._properties.contestType = contestType;
  }

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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  @Transform(({ obj }) => obj._weapon?.id, { toPlainOnly: true })
  @Expose({ name: 'weaponId' })
  get weapon() {
    return this._weapon;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  @Transform(({ obj }) => obj._category?.id, { toPlainOnly: true })
  @Expose({ name: 'categoryId' })
  get category() {
    return this._category;
  }

  get expectedParticipants() {
    return this._properties.expectedParticipants;
  }

  get deploymentCriteria() {
    return this._properties.deploymentCriteria;
  }

  get groupHits() {
    return this._properties.groupHits;
  }

  get eliminationHits() {
    return this._properties.eliminationHits;
  }

  get rounds() {
    return this._rounds;
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
