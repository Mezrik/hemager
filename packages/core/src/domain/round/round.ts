import { DeploymentCriteria } from '@hemager/api-types';
import { Result } from 'true-myth';

import { Entity, EntityProperties } from '@/common/entity';
import { InternalError } from '@/common/errors';

import { Group } from '../group/group';

import { RoundParticipant } from './round-participant';
import { Expose } from 'class-transformer';

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
    maxPerGroup: number,
    criteria: DeploymentCriteria[],
  ): Result<Group[], InternalError> {
    if (this._participants.length < maxPerGroup * 2) {
      return Result.err({ cause: 'Insufficient participants assigned to this round' });
    }

    const groupCount = Math.ceil(this._participants.length / maxPerGroup);

    const groupedParticipants: RoundParticipant[][] = Array.from({ length: groupCount }, () => []);

    const sortedParticipants = this._participants.sort((a, b) => {
      for (const criterion of criteria) {
        const aValue = a.retrieveDeplymentCriterion(criterion);
        const bValue = b.retrieveDeplymentCriterion(criterion);

        const standardizedA = aValue ?? '';
        const standardizedB = bValue ?? '';

        if (typeof standardizedA === 'number' && typeof standardizedB === 'number') {
          if (standardizedA < standardizedB) return -1;
          if (standardizedA > standardizedB) return 1;
        } else {
          const stringA = String(standardizedA);
          const stringB = String(standardizedB);
          if (stringA < stringB) return -1;
          if (stringA > stringB) return 1;
        }
      }
      return 0;
    });

    for (const participant of sortedParticipants) {
      let bestGroupIndex = 0;
      let minConflicts = Infinity;

      for (let i = 0; i < groupedParticipants.length; i++) {
        const group = groupedParticipants[i];
        let conflicts = 0;

        for (const existing of group) {
          for (const criterion of criteria) {
            if (
              existing.retrieveDeplymentCriterion(criterion) ===
              participant.retrieveDeplymentCriterion(criterion)
            ) {
              conflicts++;
            }
          }
        }

        if (conflicts < minConflicts) {
          minConflicts = conflicts;
          bestGroupIndex = i;
        }
      }

      groupedParticipants[bestGroupIndex].push(participant);
    }

    const groups = groupedParticipants.map((participants) => {
      return new Group(this.id, participants);
    });

    this._groups = groups;

    return Result.ok(groups);
  }
}
