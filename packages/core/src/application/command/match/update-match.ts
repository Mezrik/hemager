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
import { GroupMatchResult } from '@/domain/group/group-match-result';
import { GroupRepository } from '@/domain/group/group-repository';

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
    @inject(TYPES.GroupRepository) private readonly _groupRepository: GroupRepository,
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

          if (match.matchEnd) {
            const firstResult = new GroupMatchResult(
              match.id,
              match.participants[0].contestantId,
              match.groupId,
              match.points[0],
              match.points[1],
            );

            const secondResult = new GroupMatchResult(
              match.id,
              match.participants[1].contestantId,
              match.groupId,
              match.points[1],
              match.points[0],
            );

            await this._groupRepository.insertResults([firstResult, secondResult], transaction);
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
