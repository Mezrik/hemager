import { Entity, EntityProperties } from '@/common/entity';

export enum CompetitionTypeEnum {
  national = 'national',
  international = 'international',
}

export enum GenderEnum {
  male = 'male',
  female = 'female',
  mixed = 'mixed',
}

type CompetitionProperties = {
  name: string;
  organizerName: string;
  federationName: string;
  competitionType: CompetitionTypeEnum;
  gender: GenderEnum;
  date: Date;
};

export class Competition extends Entity {
  constructor(
    private _properties: CompetitionProperties,
    _entityProperties?: EntityProperties,
  ) {
    super(_entityProperties);
  }

  get name() {
    return this._properties.name;
  }

  update<K extends keyof CompetitionProperties>(key: K, value: CompetitionProperties[K]) {
    this._properties[key] = value;
  }
}
