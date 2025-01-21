import { MatchStateChange } from '@hemager/api-types';

import { Entity, EntityProperties } from '@/common/entity';
import { Expose } from 'class-transformer';

export class MatchState extends Entity {
  constructor(
    private _change: MatchStateChange,
    private _matchId: string,
    private _pointTo?: string,
    private _points?: number,

    _entityProperties?: EntityProperties,
  ) {
    super(_entityProperties);
  }

  @Expose()
  get change(): MatchStateChange {
    return this._change;
  }

  @Expose()
  get pointToContestantId(): string | undefined {
    return this._pointTo;
  }

  @Expose()
  get points(): number | undefined {
    return this._points;
  }

  @Expose()
  get matchId(): string | undefined {
    return this._matchId;
  }

  @Expose()
  get timestamp(): Date | undefined {
    return this.createdAt;
  }
}
