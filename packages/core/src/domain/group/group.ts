import { Expose } from 'class-transformer';

import { Entity, EntityProperties } from '@/common/entity';

import { Referee } from '../contest/referee';
import { sortMatches } from '../match/helpers';
import { Match } from '../match/match';
import { RoundParticipant } from '../round/round-participant';

export class Group extends Entity {
  constructor(
    private _roundId: string,
    private _participants: RoundParticipant[],
    private _referee?: Referee,
    _entityProperties?: EntityProperties,
  ) {
    super(_entityProperties);
  }

  @Expose()
  get roundId() {
    return this._roundId;
  }

  @Expose()
  get participants() {
    return this._participants;
  }

  @Expose()
  get referee() {
    return this._referee;
  }

  public initializeMatches() {
    const matches: Match[] = [];

    for (let i = 0; i < this.participants.length; i++) {
      for (let j = i + 1; j < this.participants.length; j++) {
        matches.push(
          new Match(
            this.id,
            [
              new RoundParticipant(this._roundId, this.participants[i].contestant),
              new RoundParticipant(this._roundId, this.participants[j].contestant),
            ],
            [],
          ),
        );
      }
    }

    const { merged, rest } = sortMatches(matches);

    return [...merged, ...rest];
  }
}
