import { DeploymentCriteria } from '@hemager/api-types';
import { Expose } from 'class-transformer';
import { Result } from 'true-myth';

import { Entity, EntityProperties } from '@/common/entity';
import { InternalError } from '@/common/errors';

import { Group } from '../group/group';

import { RoundParticipant } from './round-participant';

export class Round extends Entity {
  constructor(
    private _contestId: string,
    private _previousRound?: Round,
    private _participants: RoundParticipant[] = [],
    private _groups: Group[] = [],
    _entityProperties?: EntityProperties,
  ) {
    super(_entityProperties);
  }

  @Expose()
  get contestId() {
    return this._contestId;
  }

  @Expose()
  get previousRound() {
    return this._previousRound;
  }

  @Expose()
  get groups() {
    return this._groups;
  }

  @Expose()
  get participants() {
    return this._participants;
  }

  set participants(participants: RoundParticipant[]) {
    this._participants = participants;
  }

  public initializeGroups(
    targetGroupSize: number,
    criteria: DeploymentCriteria[],
  ): Result<Group[], InternalError> {
    if (this._participants?.length < targetGroupSize * 2) {
      return Result.err({ cause: 'Insufficient participants assigned to this round' });
    }

    const groupCount = Math.ceil(this._participants?.length / targetGroupSize);

    const groupedParticipants: RoundParticipant[][] = Array.from({ length: groupCount }, () => []);

    const ratedContestants = this._participants.filter((c) => c.contestant.rating !== undefined);
    const unratedContestants = this._participants.filter((c) => c.contestant.rating === undefined);

    const minRating = Math.min(...ratedContestants.map((c) => c.contestant.rating!));
    const maxRating = Math.max(...ratedContestants.map((c) => c.contestant.rating!));
    const ratingBucketSize = (maxRating - minRating) / groupCount;

    const getRatingBucket = (rating: number | undefined) =>
      rating !== undefined ? Math.floor((rating - minRating) / ratingBucketSize) : -1;

    const distribute = (pool: RoundParticipant[], isRated: boolean) => {
      for (const contestant of pool) {
        let bestGroupIndex = -1;
        let minConflict = Infinity;

        for (let i = 0; i < groupCount; i++) {
          const group = groupedParticipants[i];
          if (group.length >= targetGroupSize) continue; // Enforce size limit

          const conflictCount = criteria.reduce((conflicts, criterion) => {
            if (criterion === DeploymentCriteria.rating && isRated) {
              const bucket = getRatingBucket(contestant.contestant.rating);
              return (
                conflicts +
                group.filter((c) => getRatingBucket(c.contestant.rating) === bucket).length
              );
            } else {
              return (
                conflicts +
                group.filter(
                  (c) =>
                    c.retrieveDeplymentCriterion(criterion) ===
                    contestant.retrieveDeplymentCriterion(criterion),
                ).length
              );
            }
          }, 0);

          // Choose the group with the least conflicts
          if (conflictCount < minConflict) {
            minConflict = conflictCount;
            bestGroupIndex = i;
          }
        }

        groupedParticipants[bestGroupIndex].push(contestant);
      }
    };

    distribute(ratedContestants, true); // Distribute rated contestants first
    distribute(unratedContestants, false); // Then distribute unrated contestants

    const groups = groupedParticipants.map((participants) => {
      return new Group(this.id, participants);
    });

    this._groups = groups;

    return Result.ok(groups);
  }
}
