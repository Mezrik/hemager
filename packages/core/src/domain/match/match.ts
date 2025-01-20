import { Entity, EntityProperties } from '@/common/entity';

import { RoundParticipant } from '../round/round-participant';

import { MatchState } from './match-state';
import { Expose } from 'class-transformer';

export class Match extends Entity {
  constructor(
    private _groupId: string,
    private _participants: [RoundParticipant, RoundParticipant],
    private _matchStates: MatchState[] = [],
    _entityProperties?: EntityProperties,
  ) {
    super(_entityProperties);
  }

  @Expose()
  get groupId() {
    return this._groupId;
  }

  @Expose()
  get participants() {
    return this._participants;
  }

  @Expose()
  get matchStates() {
    return this._matchStates;
  }
}
