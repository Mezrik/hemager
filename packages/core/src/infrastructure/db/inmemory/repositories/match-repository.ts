import { inject, injectable } from 'inversify';
import { Sequelize } from 'sequelize-typescript';

import { TYPES } from '@/di-types';
import { Match } from '@/domain/match/match';
import { MatchRepository as MatchRepositoryInterface } from '@/domain/match/match-repository';

import { BaseRepository } from '../base-repository';
import {
  entityToMatchAttributes,
  matchModelToEntity,
  Match as MatchModel,
} from '../models/match.model';
import { Transaction } from 'sequelize';
import { MatchParticipant } from '../models/match-participant.model';
import { nanoid } from 'nanoid';
import { Contestant } from '../models/contestant.model';
import { MatchState } from '../models/match-state.model';
import { instanceToPlain } from 'class-transformer';

@injectable()
export class MatchRepository
  extends BaseRepository<MatchModel, Match>
  implements MatchRepositoryInterface
{
  constructor(@inject(TYPES.Db) private _db: Sequelize) {
    super(_db, MatchModel, Match, matchModelToEntity, entityToMatchAttributes, [
      {
        model: _db.getRepository(MatchParticipant),
        include: [
          {
            model: _db.getRepository(Contestant),
          },
        ],
      },
      {
        model: _db.getRepository(MatchState),
      },
    ]);
  }

  async findByGroupId(groupId: string): Promise<Match[]> {
    const repo = this._db.getRepository(MatchModel);

    const groups = await repo.findAll({
      where: { groupId },
      include: this._include,
    });

    return groups.map((group) => this._modelToEntity(group));
  }

  async bulkCreate(matches: Match[], transaction?: Transaction): Promise<void> {
    const repo = this._db.getRepository(MatchModel);
    const participantsRepo = this._db.getRepository(MatchParticipant);

    await repo.bulkCreate(
      matches.map((match) => this._entityToAttributes(match)),
      { transaction },
    );

    await participantsRepo.bulkCreate(
      matches.flatMap((match) =>
        match.participants.map((participant) => ({
          id: nanoid(),
          matchId: match.id,
          contestantId: participant.contestantId,
        })),
      ),
      { transaction },
    );
  }

  override async update(id: string, item: Match, transaction?: Transaction): Promise<void> {
    const payload = this._entityToAttributes(item);
    const stateRepo = this._db.getRepository(MatchState);

    stateRepo.bulkCreate(
      item.matchStates.map((state) => instanceToPlain(state)),
      { transaction, ignoreDuplicates: true },
    );

    // @ts-expect-error Property 'id' does not exist on type 'U'.
    await this._dbRepo.update(payload, {
      where: { id },
      transaction,
    });
  }
}
