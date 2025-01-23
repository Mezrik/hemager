import { MatchStateChange } from '@hemager/api-types';
import { Expose } from 'class-transformer';
import { Result } from 'true-myth';
import { err, ok } from 'true-myth/result';

import { Entity, EntityProperties } from '@/common/entity';
import { InternalError } from '@/common/errors';

import { RoundParticipant } from '../round/round-participant';

import { getContestantMatchPoints } from './helpers';
import { MatchState } from './match-state';

export type MatchError = InternalError;

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
    const orderedStates = this._matchStates.sort((a, b) => {
      const aTime = a.timestamp?.getTime() ?? 0;
      const bTime = b.timestamp?.getTime() ?? 0;
      return aTime - bTime;
    });

    const end = orderedStates.findIndex((state) => state.change === MatchStateChange.matchEnd);

    if (end > -1) {
      // move end to the end
      orderedStates.push(orderedStates.splice(end, 1)[0]);
    }

    return orderedStates;
  }

  @Expose()
  get matchStart(): Date | undefined {
    const start = this._matchStates.find((state) => state.change === MatchStateChange.matchStart);
    return start?.createdAt;
  }

  @Expose()
  get matchEnd(): Date | undefined {
    const end = this._matchStates.find((state) => state.change === MatchStateChange.matchEnd);
    return end?.createdAt;
  }

  @Expose()
  get paused(): boolean {
    const lastFightStart = this.matchStates.findLastIndex(
      (state) => state.change === MatchStateChange.fightStart,
    );

    const lastFightStop = this.matchStates.findLastIndex(
      (state) => state.change === MatchStateChange.fightStop,
    );

    return lastFightStart < lastFightStop;
  }

  @Expose()
  get winner(): string | undefined {
    const [first, second] = this.points;
    if (first > second) {
      return this._participants[0].contestantId;
    } else if (second > first) {
      return this._participants[1].contestantId;
    }

    // not ended or draw
    return undefined;
  }

  @Expose()
  get points(): [number, number] {
    const first = getContestantMatchPoints(this._participants[0].contestantId, this._matchStates);
    const second = getContestantMatchPoints(this._participants[1].contestantId, this._matchStates);

    return [first, second];
  }

  public startMatch(): Result<MatchState[], MatchError> {
    if (this.matchEnd) {
      return err({ cause: 'Match already ended' });
    }

    if (this._matchStates.find((state) => state.change === MatchStateChange.matchStart)) {
      return err({ cause: 'Match already started' });
    }

    this._matchStates.push(new MatchState(MatchStateChange.matchStart, this.id));

    return ok(this._matchStates);
  }

  public endMatch(): Result<MatchState[], MatchError> {
    if (this.matchEnd) {
      return err({ cause: 'Match already ended' });
    }

    this._matchStates.push(new MatchState(MatchStateChange.matchEnd, this.id));

    return ok(this._matchStates);
  }

  public startFight(): Result<MatchState[], MatchError> {
    if (this.matchEnd) {
      return err({ cause: 'Match already ended' });
    }

    const lastFightStart = this.matchStates.findLastIndex(
      (state) => state.change === MatchStateChange.fightStart,
    );

    const lastFightStop = this.matchStates.findLastIndex(
      (state) => state.change === MatchStateChange.fightStop,
    );

    if (lastFightStart > lastFightStop) {
      return err({ cause: 'Fight already started' });
    }

    this._matchStates.push(new MatchState(MatchStateChange.fightStart, this.id));

    return ok(this._matchStates);
  }

  public stopFight(): Result<MatchState[], MatchError> {
    if (this.matchEnd) {
      return err({ cause: 'Match already ended' });
    }

    if (this.paused) {
      return err({ cause: 'Fight already stopped' });
    }

    this._matchStates.push(new MatchState(MatchStateChange.fightStop, this.id));

    return ok(this._matchStates);
  }

  public addPoints(points: number, to: string): Result<MatchState[], MatchError> {
    if (this.matchEnd) {
      return err({ cause: 'Match already ended' });
    }

    const participantIndex = this._participants.findIndex(
      (participant) => participant.contestantId === to,
    );

    if (participantIndex === -1) {
      return err({ cause: 'Participant not found' });
    }

    const currentPoints = this.points[participantIndex];

    if (currentPoints + points < 0) {
      return err({ cause: 'Negative points' });
    }

    this._matchStates.push(new MatchState(MatchStateChange.pointAdded, this.id, to, points));

    // TODO: End match when max points is reached
    if (currentPoints + points === 5) {
      this._matchStates.push(new MatchState(MatchStateChange.matchEnd, this.id));
    }

    return ok(this._matchStates);
  }

  public updateState(change: MatchStateChange, pointsTo?: string, points: number = 1) {
    switch (change) {
      case MatchStateChange.matchStart:
        return this.startMatch();
      case MatchStateChange.matchEnd:
        return this.endMatch();
      case MatchStateChange.fightStart:
        return this.startFight();
      case MatchStateChange.fightStop:
        return this.stopFight();
      case MatchStateChange.pointAdded:
        if (!pointsTo) {
          return err({ cause: 'Points receiver is required' });
        }

        return this.addPoints(points, pointsTo);
      case MatchStateChange.pointSubtracted:
        if (!pointsTo) {
          return err({ cause: 'Points receiver is required' });
        }

        return this.addPoints(-points, pointsTo ?? '');
      default:
        return err({ cause: 'Invalid state change' });
    }
  }
}
