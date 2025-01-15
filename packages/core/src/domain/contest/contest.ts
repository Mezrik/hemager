import { Entity, EntityProperties } from '@/common/entity';
import { ContestTypeEnum, DeploymentCriteria, GenderEnum } from '@/common/enums';

import { ContestCategory } from './category';
import { Weapon } from './weapon';

type ContestProperties = {
  name: string;
  date: Date;

  organizerName?: string;
  federationName?: string;
  contestType?: ContestTypeEnum;
  gender?: GenderEnum;
  weapon?: Weapon;
  category?: ContestCategory;

  expectedParticipants?: number;
  deploymentCriteria?: DeploymentCriteria[];
  groupHits?: number;
  eliminationHits?: number;
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
