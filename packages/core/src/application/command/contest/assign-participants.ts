import { inject, injectable } from 'inversify';
import { Task } from 'true-myth';

import { Command } from '@/common/command';
import { CommandError, CommandErrorTypes, ensureThrownError } from '@/common/errors';
import { CommandHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { ContestRepository } from '@/domain/contest/contest-repository';
import { RoundRepository } from '@/domain/round/round-repository';

export class AssignParticipantsCommand extends Command {
  constructor(
    public contestId: string,
    public participants: string[],
    commandGuid?: string,
  ) {
    super(commandGuid);
  }
}

@injectable()
export class AssignParticipantsCommandHandler implements CommandHandler<AssignParticipantsCommand> {
  commandToHandle: string = AssignParticipantsCommand.name;

  constructor(
    @inject(TYPES.ContestRepository) private readonly _repository: ContestRepository,
    private readonly _roundRepository: RoundRepository,
  ) {}

  handle(command: AssignParticipantsCommand): Task<void, CommandError> {
    return new Task((resolve, reject) => {
      const asyncFn = async () => {
        if (!command.contestId) {
          reject({
            cause: 'Contest ID is required',
            type: CommandErrorTypes.INCORRECT_INPUT,
          });
          return;
        }

        const contest = await this._repository.findOne(command.contestId);

        if (!contest) {
          reject({
            cause: 'Contest not found',
            type: CommandErrorTypes.NOT_FOUND,
          });
          return;
        }

        const firstRound = contest.rounds[0];

        if (!firstRound) {
          reject({
            cause: 'Contest has no rounds',
            type: CommandErrorTypes.NOT_FOUND,
          });
          return;
        }

        try {
          await this._roundRepository.assignParticipants(command.contestId, command.participants);
        } catch (err) {
          const error = ensureThrownError(err);
          reject({ cause: error.message, type: CommandErrorTypes.CAUGHT_EXCEPTION });
        }
      };

      void asyncFn().then(resolve);
    });
  }
}
