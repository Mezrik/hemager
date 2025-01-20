import { inject } from 'inversify';
import { Task } from 'true-myth';

import { ensureThrownError, QueryError, QueryErrorTypes } from '@/common/errors';
import { Query, QueryHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { ContestRepository } from '@/domain/contest/contest-repository';
import { RoundParticipant } from '@/domain/round/round-participant';
import { RoundRepository } from '@/domain/round/round-repository';

export class GetAllParticipantsQuery implements Query {
  constructor(public contestId: string) {}
}

export class GetAllParticipantsQueryHandler
  implements QueryHandler<GetAllParticipantsQuery, RoundParticipant[]>
{
  queryToHandle = GetAllParticipantsQuery.name;

  constructor(
    @inject(TYPES.ContestRepository) private readonly _repository: ContestRepository,
    @inject(TYPES.RoundRepository) private readonly _roundRepository: RoundRepository,
  ) {}

  execute(query: GetAllParticipantsQuery): Task<RoundParticipant[], QueryError> {
    return new Task((resolve, reject) => {
      const asyncFn = async () => {
        const contest = await this._repository.findOne(query.contestId);

        if (!contest) {
          reject({ cause: 'Contest not found', type: QueryErrorTypes.NOT_FOUND });
          return;
        }

        const firstRound = contest.rounds[0];

        if (!firstRound) {
          reject({ cause: 'Round not found', type: QueryErrorTypes.NOT_FOUND });
          return;
        }

        const round = await this._roundRepository.findOne(firstRound.id);

        const participants = round?.participants ?? [];

        return participants;
      };

      asyncFn()
        .then((participants) => {
          if (!participants) {
            reject({ cause: 'Participants not found', type: QueryErrorTypes.NOT_FOUND });
            return;
          }
          resolve(participants);
        })
        .catch((err) => {
          const error = ensureThrownError(err);
          console.error(error);
          reject({
            cause: `Failed to get participants - ${error.message}`,
            type: QueryErrorTypes.CAUGHT_EXCEPTION,
          });
        });
    });
  }
}
