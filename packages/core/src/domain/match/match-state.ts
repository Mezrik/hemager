import { MatchStateChange } from '@hemager/api-types';

import { Entity, EntityProperties } from '@/common/entity';

export class MatchState extends Entity {
  constructor(
    private _change: MatchStateChange,
    private _matchId: string,
    private _pointTo?: string,

    _entityProperties?: EntityProperties,
  ) {
    super(_entityProperties);
  }

  get change(): MatchStateChange {
    return this._change;
  }

  get pointToContestantId(): string | undefined {
    return this._pointTo;
  }

  get matchId(): string | undefined {
    return this._matchId;
  }
}
