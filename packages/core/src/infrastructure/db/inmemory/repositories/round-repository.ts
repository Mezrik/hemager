import { inject, injectable } from 'inversify';
import { Sequelize } from 'sequelize-typescript';

import { TYPES } from '@/di-types';
import { Round } from '@/domain/round/round';
import { RoundRepository as RoundRepositoryInterface } from '@/domain/round/round-repository';

import { BaseRepository } from '../base-repository';
import {
  entityToRoundAttributes,
  Round as RoundModel,
  roundModelToEntity,
} from '../models/round.model';
import { RoundParticipant } from '../models/round-participant.model';
import { Op } from 'sequelize';
import { Contestant } from '../models/contestant.model';
import { Club } from '../models/club.model';

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
}
