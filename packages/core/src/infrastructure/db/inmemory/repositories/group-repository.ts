import { instanceToPlain } from 'class-transformer';
import { inject, injectable } from 'inversify';
import { Attributes, Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { TYPES } from '@/di-types';
import { Group } from '@/domain/group/group';
import { GroupMatchResult } from '@/domain/group/group-match-result';
import { GroupRepository as GroupRepositoryInterface } from '@/domain/group/group-repository';

import { BaseRepository } from '../base-repository';
import { Contestant } from '../models/contestant.model';
import { GroupMatchResult as GroupMatchResultModel } from '../models/group-match-result.model';
import { GroupParticipant } from '../models/group-participant.model';
import {
  entityToGroupAttributes,
  Group as GroupModel,
  groupModelToEntity,
} from '../models/group.model';

@injectable()
export class GroupRepository
  extends BaseRepository<GroupModel, Group>
  implements GroupRepositoryInterface
{
  constructor(@inject(TYPES.Db) private _db: Sequelize) {
    const groupParticipantRepo = _db.getRepository(GroupParticipant);
    const contestantRepo = _db.getRepository(Contestant);

    super(_db, GroupModel, Group, groupModelToEntity, entityToGroupAttributes, [
      {
        model: groupParticipantRepo,
        required: true,
        include: [{ model: contestantRepo }],
      },
    ]);
  }

  async findByRoundId(roundId: string): Promise<Group[]> {
    const repo = this._db.getRepository(GroupModel);
    const groupParticipantRepo = this._db.getRepository(GroupParticipant);
    const contestantRepo = this._db.getRepository(Contestant);

    const groups = await repo.findAll({
      where: { roundId },
      include: [
        {
          model: groupParticipantRepo,
          required: true,
          include: [{ model: contestantRepo }],
        },
      ],
    });

    return groups.map((group) => this._modelToEntity(group));
  }

  override async create(item: Group, transaction?: Transaction): Promise<Group> {
    const repo = this._db.getRepository(GroupModel);
    const groupParticipantRepo = this._db.getRepository(GroupParticipant);
    const attributes = instanceToPlain(this._entityToAttributes(item)) as Attributes<GroupModel>;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await repo.create(attributes, {
      transaction,
      include: [groupParticipantRepo],
    });

    //@ts-expect-error  Something is wrong here
    return null;
  }

  async insertResults(result: GroupMatchResult[], transaction?: Transaction): Promise<void> {
    const repo = this._db.getRepository(GroupMatchResultModel);

    await repo.bulkCreate(
      result.map((item) => instanceToPlain(item)),
      { transaction },
    );
  }
}
