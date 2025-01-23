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
    const MIN_GROUP_SIZE = 4;

    if (targetGroupSize < MIN_GROUP_SIZE) {
      return Result.err({ cause: `Target group size must be at least ${MIN_GROUP_SIZE}` });
    }

    if (this._participants?.length < targetGroupSize * 2) {
      return Result.err({ cause: 'Insufficient participants assigned to this round' });
    }

    const groupCount = Math.floor(this._participants.length / targetGroupSize);

    if (groupCount === 0) {
      return Result.err({ cause: 'Not enough participants to form even a single group' });
    }

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

        groupedParticipants[bestGroupIndex]?.push(contestant);
      }
    };

    distribute(ratedContestants, true);
    distribute(unratedContestants, false);

    const smallGroups = groupedParticipants.filter((g) => g.length < MIN_GROUP_SIZE);
    const largeGroups = groupedParticipants.filter((g) => g.length > MIN_GROUP_SIZE);

    for (const smallGroup of smallGroups) {
      while (smallGroup.length < MIN_GROUP_SIZE && largeGroups.length > 0) {
        const largestGroup = largeGroups.reduce((maxGroup, currentGroup) =>
          currentGroup.length > maxGroup.length ? currentGroup : maxGroup,
        );

        const movedParticipant = largestGroup.pop();
        if (movedParticipant) {
          smallGroup.push(movedParticipant);
        }

        if (largestGroup.length <= MIN_GROUP_SIZE) {
          largeGroups.splice(largeGroups.indexOf(largestGroup), 1);
        }
      }
    }

    const groups = groupedParticipants.map((participants) => {
      return new Group(this.id, participants);
    });

    this._groups = groups;

    return Result.ok(groups);
  }
}
