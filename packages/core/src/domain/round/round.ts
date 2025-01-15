import { Entity, EntityProperties } from '@/common/entity';

import { RoundParticipant } from './round-participant';

export class Round extends Entity {
  constructor(
    private _contestId: string,
    private _previousRound?: Round,
    private _participants?: RoundParticipant[],
    _entityProperties?: EntityProperties,
  ) {
    super(_entityProperties);
  }

  get contestId() {
    return this._contestId;
  }

  get previousRound() {
    return this._previousRound;
  }
}
