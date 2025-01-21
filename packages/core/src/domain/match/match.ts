import { Entity, EntityProperties } from '@/common/entity';

import { RoundParticipant } from '../round/round-participant';

import { MatchState } from './match-state';
import { Expose } from 'class-transformer';
import { Result } from 'true-myth';
import { InternalError } from '@/common/errors';
import { MatchStateChange } from '@hemager/api-types';
import { err, ok } from 'true-myth/result';
import { getContestantMatchPoints } from './helpers';

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
    return this._matchStates;
  }

  @Expose()
  get matchStart(): Date | undefined {
    const start = this._matchStates.find((state) => state.change === MatchStateChange.matchStart);
    return start?.createdAt;
  }

  @Expose()
  get points(): [number, number] {
    const first = getContestantMatchPoints(this._participants[0].contestantId, this._matchStates);
    const second = getContestantMatchPoints(this._participants[1].contestantId, this._matchStates);

    return [first, second];
  }

  public startMatch(): Result<MatchState[], MatchError> {
    if (this._matchStates.find((state) => state.change === MatchStateChange.matchStart)) {
      return err({ cause: 'Match already started' });
    }

    this._matchStates.push(new MatchState(MatchStateChange.matchStart, this.id));

    return ok(this._matchStates);
  }

  public endMatch(): Result<MatchState[], MatchError> {
    if (this._matchStates.find((state) => state.change === MatchStateChange.matchEnd)) {
      return err({ cause: 'Match already ended' });
    }

    this._matchStates.push(new MatchState(MatchStateChange.matchEnd, this.id));

    return ok(this._matchStates);
  }

  public startFight(): Result<MatchState[], MatchError> {
    const lastFightStart = this._matchStates.findLastIndex(
      (state) => state.change === MatchStateChange.fightStart,
    );

    const lastFightStop = this._matchStates.findLastIndex(
      (state) => state.change === MatchStateChange.fightStop,
    );

    if (lastFightStart > lastFightStop) {
      return err({ cause: 'Fight already started' });
    }

    this._matchStates.push(new MatchState(MatchStateChange.fightStart, this.id));

    return ok(this._matchStates);
  }

  public stopFight(): Result<MatchState[], MatchError> {
    const lastFightStart = this._matchStates.findLastIndex(
      (state) => state.change === MatchStateChange.fightStart,
    );

    const lastFightStop = this._matchStates.findLastIndex(
      (state) => state.change === MatchStateChange.fightStop,
    );

    if (lastFightStart < lastFightStop) {
      return err({ cause: 'Fight already stopped' });
    }

    this._matchStates.push(new MatchState(MatchStateChange.fightStop, this.id));

    return ok(this._matchStates);
  }

  public addPoints(points: number, to: string): Result<MatchState[], MatchError> {
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

    return ok(this._matchStates);
  }
}
