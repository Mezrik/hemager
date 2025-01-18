import { GenderEnum } from '@hemager/api-types';
import { inject, injectable } from 'inversify';
import Task from 'true-myth/task';

import { Command } from '@/common/command';
import { CommandError, CommandErrorTypes, ensureThrownError } from '@/common/errors';
import { CommandHandler } from '@/common/interfaces';
import { TransactionManager } from '@/common/interfaces/transaction-manager';
import { TYPES } from '@/di-types';
import { Contestant } from '@/domain/contestant/contestant';
import { ContestantRepository } from '@/domain/contestant/contestant-repository';
import { RoundRepository } from '@/domain/round/round-repository';

export class CreateContestantCommand extends Command {
  constructor(
    public firstname: string,
    public surname: string,

    public clubId?: string,
    public birthdate?: Date,
    public gender?: GenderEnum,
    public rating?: number,
    guid?: string,
  ) {
    super(guid);
  }
}

@injectable()
export class CreateContestantCommandHandler implements CommandHandler<CreateContestantCommand> {
  commandToHandle: string = CreateContestantCommand.name;

  constructor(
    @inject(TYPES.ContestantRepository) private readonly _repository: ContestantRepository,
    @inject(TYPES.RoundRepository) private readonly _roundRepository: RoundRepository,
    @inject(TYPES.TransactionManager) private readonly _transactionManager: TransactionManager,
  ) {}

  handle(command: CreateContestantCommand): Task<void, CommandError> {
    return new Task((resolve, reject) => {
      const asyncFn = async () => {
        const club = command.clubId
          ? await this._repository.findByClubId(command.clubId)
          : undefined;

        if (command.clubId && !club) {
          reject({ cause: 'Club not found', type: CommandErrorTypes.NOT_FOUND });
          return;
        }

        const contestant: Contestant = new Contestant({
          firstname: command.firstname,
          surname: command.surname,
          birthdate: command.birthdate,
          gender: command.gender,
          rating: command.rating,

          club: club ?? undefined,
        });

        try {
          await this._repository.create(contestant);
        } catch (err) {
          const error = ensureThrownError(err);
          reject({ cause: error.message, type: CommandErrorTypes.CAUGHT_EXCEPTION });
        }

        resolve();
      };

      void asyncFn().then(resolve);
    });
  }
}
