import { Expose } from 'class-transformer';

import { Entity, EntityProperties } from '@/common/entity';

import { Referee } from '../contest/referee';
import { RoundParticipant } from '../round/round-participant';
import { Match } from '../match/match';

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
    for (const participant of this.participants) {
      this.participants.forEach((p) => {
        if (p.contestantId !== participant.contestantId) {
          matches.push(
            new Match(
              this.id,
              [
                new RoundParticipant(this._roundId, p.contestant),
                new RoundParticipant(this._roundId, participant.contestant),
              ],
              [],
            ),
          );
        }
      });
    }

    return matches;
  }
}
