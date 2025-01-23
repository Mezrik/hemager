import { Expose } from 'class-transformer';

import { Entity, EntityProperties } from '@/common/entity';

import { Referee } from '../contest/referee';
import { sortMatches } from '../match/helpers';
import { Match } from '../match/match';
import { RoundParticipant } from '../round/round-participant';

export class GroupMatchResult extends Entity {
  constructor(
    private _matchId: string,
    private _contestantId: string,
    private _groupId: string,
    private _pointsFor: number,
    private _pointsAgainst: number,
    _entityProperties?: EntityProperties,
  ) {
    super(_entityProperties);
  }

  @Expose()
  get matchId() {
    return this._matchId;
  }

  @Expose()
  get contestantId() {
    return this._contestantId;
  }

  @Expose()
  get groupId() {
    return this._groupId;
  }

  @Expose()
  get pointsFor() {
    return this._pointsFor;
  }

  @Expose()
  get pointsAgainst() {
    return this._pointsAgainst;
  }
}
