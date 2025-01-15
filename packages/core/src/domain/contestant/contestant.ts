import { Entity, EntityProperties } from '@/common/entity';
import { GenderEnum } from '@/common/enums';

import { Club } from './club';

type ContestantProperties = {
  firstname: string;
  surname: string;

  club?: Club;
  birthdate?: Date;
  gender?: GenderEnum;
  rating?: number;
};

export class Contestant extends Entity {
  constructor(
    private _properties: ContestantProperties,
    _entityProperties?: EntityProperties,
  ) {
    super(_entityProperties);
  }

  get fullname() {
    return `${this._properties.firstname} ${this._properties.surname}`;
  }

  update<K extends keyof ContestantProperties>(key: K, value: ContestantProperties[K]) {
    this._properties[key] = value;
  }
}
