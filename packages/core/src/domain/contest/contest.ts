import { Entity, EntityProperties } from '@/common/entity';

export enum ContestTypeEnum {
  national = 'national',
  international = 'international',
}

export enum GenderEnum {
  male = 'male',
  female = 'female',
  mixed = 'mixed',
}

type ContestProperties = {
  name: string;
  organizerName: string;
  federationName: string;
  contestType: ContestTypeEnum;
  gender: GenderEnum;
  date: Date;
};

export class Contest extends Entity {
  constructor(
    private _properties: ContestProperties,
    _entityProperties?: EntityProperties,
  ) {
    super(_entityProperties);
  }

  get name() {
    return this._properties.name;
  }

  update<K extends keyof ContestProperties>(key: K, value: ContestProperties[K]) {
    this._properties[key] = value;
  }
}
