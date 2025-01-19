import { inject, injectable } from 'inversify';
import Task from 'true-myth/task';

import { Command } from '@/common/command';
import { CommandError, CommandErrorTypes, ensureThrownError } from '@/common/errors';
import { CommandHandler } from '@/common/interfaces';
import { TransactionManager } from '@/common/interfaces/transaction-manager';
import { TYPES } from '@/di-types';
import { ContestRepository } from '@/domain/contest/contest-repository';
import { GroupRepository } from '@/domain/group/group-repository';

export class InitializeGroupsCommand extends Command {
  constructor(
    public contestId: string,
    public maxContestantsPerGroup: number,
    guid?: string,
  ) {
    super(guid);
  }
}

@injectable()
export class InitializeGroupsCommandHandler implements CommandHandler<InitializeGroupsCommand> {
  commandToHandle: string = InitializeGroupsCommand.name;

  constructor(
    @inject(TYPES.ContestRepository) private readonly _contestRepository: ContestRepository,
    @inject(TYPES.GroupRepository) private readonly _groupRepository: GroupRepository,
    @inject(TYPES.TransactionManager) private readonly _transactionManager: TransactionManager,
  ) {}

  handle(command: InitializeGroupsCommand): Task<void, CommandError> {
    return new Task((resolve, reject) => {
      void this._transactionManager.execute(async (transaction) => {
        if (!command.contestId) {
          reject({
            cause: 'contestId is required',
            type: CommandErrorTypes.INCORRECT_INPUT,
          });

          return;
        }

        const contest = await this._contestRepository.findOne(command.contestId);

        // We support currently only one round
        const firstRround = contest?.rounds[0];

        if (!contest) {
          reject({
            cause: 'Contest not found',
            type: CommandErrorTypes.NOT_FOUND,
          });

          return;
        }

        if (!firstRround) {
          reject({
            cause: 'No rounds found',
            type: CommandErrorTypes.NOT_FOUND,
          });

          return;
        }

        const groups = firstRround
          .initializeGroups(command.maxContestantsPerGroup, contest.deploymentCriteria ?? [])
          .unwrapOrElse((e) =>
            reject({ cause: e.cause, type: CommandErrorTypes.CAUGHT_EXCEPTION }),
          );

        try {
          await Promise.all(
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            groups?.forEach((group) => {
              return this._groupRepository.create(group, transaction);
            }) ?? [],
          );
        } catch (err) {
          const error = ensureThrownError(err);
          reject({ cause: error.message, type: CommandErrorTypes.CAUGHT_EXCEPTION });
        }

        resolve();
      });
    });
  }
}
