import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'inversify';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { instanceToPlain } from '@/common/utils/transformer';
import { TYPES } from '@/di-types';
import { Round } from '@/domain/round/round';
import { RoundRepository as RoundRepositoryInterface } from '@/domain/round/round-repository';
import { RoundResult } from '@/domain/round/round-result';

import { BaseRepository } from '../base-repository';
import { Club } from '../models/club.model';
import { Contestant } from '../models/contestant.model';
import { RoundParticipant } from '../models/round-participant.model';
import { RoundResultAggregated } from '../models/round-result-aggregated';
import {
  entityToRoundAttributes,
  Round as RoundModel,
  roundModelToEntity,
} from '../models/round.model';

@injectable()
export class RoundRepository
  extends BaseRepository<RoundModel, Round>
  implements RoundRepositoryInterface
{
  constructor(@inject(TYPES.Db) private _db: Sequelize) {
    const participantsRepo = _db.getRepository(RoundParticipant);
    const contestantRepo = _db.getRepository(Contestant);
    const clubRepo = _db.getRepository(Club);

    super(_db, RoundModel, Round, roundModelToEntity, entityToRoundAttributes, [
      {
        model: participantsRepo,
        include: [
          {
            model: contestantRepo,
            include: [clubRepo],
          },
        ],
      },
    ]);
  }

  public async findByContestId(contestId: string): Promise<Round[]> {
    const repo = this._db.getRepository(RoundModel);

    const rounds = await repo.findAll({
      where: { contestId },
    });

    return rounds.map((round) => this._modelToEntity(round));
  }

  public async assignParticipants(roundId: string, participants: string[]) {
    const repo = this._db.getRepository(RoundParticipant);

    const currentParticipants = await repo.findAll({ where: { roundId } });

    // Remove participants that are not present in the new list
    const toBeRemoved = currentParticipants.filter(
      (participant) => !participants.includes(participant.contestantId),
    );

    await Promise.all(toBeRemoved.map((participant) => participant.destroy()));

    const toBeCreated = participants.filter(
      (participant) => !currentParticipants.some((p) => p.contestantId === participant),
    );

    await repo.bulkCreate(toBeCreated.map((id) => ({ roundId, contestantId: id })));
  }

  public async getRoundResults(roundId: string): Promise<RoundResult[]> {
    return await this._db
      .query(
        `SELECT
          C.id AS contestantId,
          COUNT(*) AS totalContests,
          winCount,
          contestPointsFor,
          contestPointsAgainst
          FROM (
              SELECT
                  GM.contestantId,
                  R.contestId,
                  SUM(GM.pointsFor) AS contestPointsFor,
                  SUM(GM.pointsAgainst) AS contestPointsAgainst,
                  SUM(CASE WHEN GM.pointsFor > GM.pointsAgainst THEN 1 ELSE 0 END) AS winCount,
                  R.id AS roundId
              FROM GroupMatchResult AS GM
                  JOIN "Group" AS G ON G.id = GM.groupId
                  JOIN Round AS R ON R.id = G.roundId
              GROUP BY GM.contestantId, R.contestId
          ) AS contestAgg
          JOIN Contestant AS C ON C.id = contestAgg.contestantId
          WHERE roundId = '${roundId}'
          GROUP BY C.firstname, C.surname;
          `,
        {
          type: QueryTypes.SELECT,
        },
      )
      .then((results) => {
        return results.map((result) => plainToInstance(RoundResult, result));
      });
  }
}
