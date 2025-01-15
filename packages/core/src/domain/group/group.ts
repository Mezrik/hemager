import { Entity, EntityProperties } from '@/common/entity';

import { Referee } from '../contest/referee';
import { RoundParticipant } from '../round/round-participant';

export class Group extends Entity {
  constructor(
    private _roundId: string,
    private _referee: Referee,
    private _participants: RoundParticipant[],
    _entityProperties?: EntityProperties,
  ) {
    super(_entityProperties);
  }

  get roundId() {
    return this._roundId;
  }

  get referee() {
    return this._referee;
  }
}
