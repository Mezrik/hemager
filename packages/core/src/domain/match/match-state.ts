import { Entity, EntityProperties } from '@/common/entity';
import { MatchStateChange } from '@hemager/api-types';

export class MatchState extends Entity {
  constructor(
    private _change: MatchStateChange,
    private _pointTo: string,
    _entityProperties?: EntityProperties,
  ) {
    super(_entityProperties);
  }
}
