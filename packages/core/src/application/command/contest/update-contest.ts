import { ContestTypeEnum, DeploymentCriteria, GenderEnum } from '@hemager/api';
import { inject, injectable } from 'inversify';

import { Command } from '@/common/command';
import { CommandHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { Contest } from '@/domain/contest/contest';
import { ContestRepository } from '@/domain/contest/contest-repository';

export class UpdateContestCommand extends Command {
  constructor(
    public id: string,
    public name?: string,
    public organizerName?: string,
    public federationName?: string,
    public contestType?: ContestTypeEnum,
    public gender?: GenderEnum,
    public date?: Date,
    public weaponId?: string,
    public categoryId?: string,

    public expectedParticipants?: number,
    public deploymentCriteria?: DeploymentCriteria[],
    public groupHits?: number,
    public eliminationHits?: number,
    commandGuid?: string,
  ) {
    super(commandGuid);
  }
}

@injectable()
export class UpdateContestCommandHandler implements CommandHandler<UpdateContestCommand> {
  commandToHandle: string = UpdateContestCommand.name;

  constructor(@inject(TYPES.ContestRepository) private readonly _repository: ContestRepository) {}

  async handle(command: UpdateContestCommand): Promise<{ id: string }> {
    const weapon = command.weaponId
      ? await this._repository.getWeapon(command.weaponId)
      : undefined;

    const category = command.categoryId
      ? await this._repository.getCategory(command.categoryId)
      : undefined;

    const existingContest: Contest | null = await this._repository.findOne(command.id);

    if (!existingContest) {
      throw new Error('Contest not found');
    }

    const contest: Contest = new Contest(
      {
        name: command.name ?? existingContest.name,
        organizerName: command.organizerName ?? existingContest.organizerName,
        federationName: command.federationName ?? existingContest.federationName,
        contestType: command.contestType ?? existingContest.contestType,
        gender: command.gender ?? existingContest.gender,
        date: command.date ?? existingContest.date,

        weapon: weapon ?? existingContest.weapon,
        category: category ?? existingContest.category,

        expectedParticipants: command.expectedParticipants ?? existingContest.expectedParticipants,
        deploymentCriteria: command.deploymentCriteria ?? existingContest.deploymentCriteria,
        groupHits: command.groupHits ?? existingContest.groupHits,
        eliminationHits: command.eliminationHits ?? existingContest.eliminationHits,
      },
      { id: command.id },
    );

    await this._repository.update(contest.id, contest);

    return { id: contest.id };
  }
}
