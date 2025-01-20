import { ContestTypeEnum, DeploymentCriteria, GenderEnum } from '@hemager/api-types';
import { inject, injectable } from 'inversify';
import { Task } from 'true-myth';

import { Command } from '@/common/command';
import { CommandError, CommandErrorTypes } from '@/common/errors';
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

  handle(command: UpdateContestCommand): Task<void, CommandError> {
    return new Task((resolve, reject) => {
      const asyncFn = async () => {
        console.log(command.weaponId, command.categoryId, command.id);
        const weapon = command.weaponId
          ? await this._repository.getWeapon(command.weaponId)
          : undefined;

        const category = command.categoryId
          ? await this._repository.getCategory(command.categoryId)
          : undefined;

        if (command.weaponId && !weapon) {
          reject({ cause: 'Weapon not found', type: CommandErrorTypes.NOT_FOUND });
        }

        if (command.categoryId && !category) {
          reject({ cause: 'Category not found', type: CommandErrorTypes.NOT_FOUND });
        }

        const existingContest: Contest | null = await this._repository.findOne(command.id);

        if (!existingContest) {
          reject({ cause: 'Contest not found', type: CommandErrorTypes.NOT_FOUND });
          return;
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

            expectedParticipants:
              command.expectedParticipants ?? existingContest.expectedParticipants,
            deploymentCriteria: command.deploymentCriteria ?? existingContest.deploymentCriteria,
            groupHits: command.groupHits ?? existingContest.groupHits,
            eliminationHits: command.eliminationHits ?? existingContest.eliminationHits,
          },
          { id: command.id },
        );

        await this._repository.update(contest.id, contest);
      };

      void asyncFn().then(resolve);
    });
  }
}
