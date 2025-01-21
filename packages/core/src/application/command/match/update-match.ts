import { inject, injectable } from 'inversify';
import Task from 'true-myth/task';

import { Command } from '@/common/command';
import { CommandError, CommandErrorTypes, ensureThrownError } from '@/common/errors';
import { CommandHandler } from '@/common/interfaces';
import { TransactionManager } from '@/common/interfaces/transaction-manager';
import { TYPES } from '@/di-types';
import { ContestRepository } from '@/domain/contest/contest-repository';
import { GroupRepository } from '@/domain/group/group-repository';
import { RoundRepository } from '@/domain/round/round-repository';
import { MatchRepository } from '@/domain/match/match-repository';

export class UpdateMatchCommand extends Command {
  constructor(
    public contestId: string,
    public maxContestantsPerGroup: number,
    guid?: string,
  ) {
    super(guid);
  }
}

@injectable()
export class UpdateMatchCommandHandler implements CommandHandler<UpdateMatchCommand> {
  commandToHandle: string = UpdateMatchCommand.name;

  constructor(
    @inject(TYPES.MatchRepository) private readonly _matchRepository: MatchRepository,
    @inject(TYPES.TransactionManager) private readonly _transactionManager: TransactionManager,
  ) {}

  handle(command: UpdateMatchCommand): Task<void, CommandError> {
    return new Task((resolve, reject) => {
      void this._transactionManager.execute(async (transaction) => {
        try {
          const match = await this._matchRepository.findOne(command.contestId);
        } catch (err) {
          const error = ensureThrownError(err);
          console.error(error);
          reject({ cause: error.message, type: CommandErrorTypes.CAUGHT_EXCEPTION });
        }

        resolve();
      });
    });
  }
}
