import { inject, injectable } from 'inversify';
import Task from 'true-myth/task';

import { Command } from '@/common/command';
import { CommandError, CommandErrorTypes, ensureThrownError } from '@/common/errors';
import { CommandHandler } from '@/common/interfaces';
import { TransactionManager } from '@/common/interfaces/transaction-manager';
import { TYPES } from '@/di-types';
import { MatchRepository } from '@/domain/match/match-repository';
import { MatchStateChange } from '@hemager/api-types';
import { unwrapErr } from 'true-myth/test-support';

export class UpdateMatchCommand extends Command {
  constructor(
    public matchId: string,
    public change: MatchStateChange,
    public pointsTo?: string,
    public point?: number,
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
          const match = await this._matchRepository.findOne(command.matchId);

          if (!match) {
            reject({ cause: 'Match not found', type: CommandErrorTypes.NOT_FOUND });
            return;
          }

          const result = match.updateState(command.change, command.pointsTo, command.point);

          if (result.isErr) {
            reject({ cause: unwrapErr(result).cause, type: CommandErrorTypes.INCORRECT_INPUT });
            return;
          }

          await this._matchRepository.update(match.id, match, transaction);
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
