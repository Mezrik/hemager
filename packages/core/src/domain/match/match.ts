import { Entity, EntityProperties } from '@/common/entity';
import { MatchState } from './match-state';
import { RoundParticipant } from '../round/round-participant';

export class Match extends Entity {
  constructor(
    private _groupId: string,
    private _participants: [RoundParticipant, RoundParticipant],
    private _matchStates: MatchState[] = [],
    _entityProperties?: EntityProperties,
  ) {
    super(_entityProperties);
  }
}
