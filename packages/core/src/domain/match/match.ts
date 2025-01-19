import { Entity, EntityProperties } from '@/common/entity';

import { RoundParticipant } from '../round/round-participant';

import { MatchState } from './match-state';

export class Match extends Entity {
  constructor(
    private _groupId: string,
    private _participants: [RoundParticipant, RoundParticipant],
    private _matchStates: MatchState[] = [],
    _entityProperties?: EntityProperties,
  ) {
    super(_entityProperties);
  }

  get groupId() {
    return this._groupId;
  }

  get participants() {
    return this._participants;
  }

  get matchStates() {
    return this._matchStates;
  }
}
