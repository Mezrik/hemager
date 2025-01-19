import { Country, GenderEnum } from '@hemager/api-types';
import { Expose } from 'class-transformer';

import { Entity, EntityProperties } from '@/common/entity';

import { Club } from './club';

type ContestantProperties = {
  firstname: string;
  surname: string;

  club?: Club;
  birthdate?: Date;
  gender?: GenderEnum;
  rating?: number;
  nationality?: Country;
};

export class Contestant extends Entity {
  constructor(
    private _properties: ContestantProperties,
    _entityProperties?: EntityProperties,
  ) {
    super(_entityProperties);
  }

  @Expose()
  get surname() {
    return this._properties.surname;
  }

  @Expose()
  get firstname() {
    return this._properties.firstname;
  }

  @Expose()
  get club() {
    return this._properties.club;
  }

  @Expose()
  get birthdate() {
    return this._properties.birthdate;
  }

  @Expose()
  get gender() {
    return this._properties.gender;
  }

  @Expose()
  get rating() {
    return this._properties.rating;
  }

  @Expose()
  get nationality() {
    return this._properties.nationality;
  }

  get fullname() {
    return `${this._properties.firstname} ${this._properties.surname}`;
  }

  update<K extends keyof ContestantProperties>(key: K, value: ContestantProperties[K]) {
    this._properties[key] = value;
  }
}
