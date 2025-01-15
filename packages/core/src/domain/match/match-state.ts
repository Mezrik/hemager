import { MatchStateChange } from '@hemager/api';

import { Entity, EntityProperties } from '@/common/entity';

export class MatchState extends Entity {
  constructor(
    private _change: MatchStateChange,
    private _pointTo: string,
    _entityProperties?: EntityProperties,
  ) {
    super(_entityProperties);
  }
}
