import { inject, injectable } from 'inversify';
import Task from 'true-myth/task';

import { Command } from '@/common/command';
import { CommandError, CommandErrorTypes, ensureThrownError } from '@/common/errors';
import { CommandHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { Club } from '@/domain/contestant/club';
import { ClubRepository } from '@/domain/contestant/club-repository';

export class CreateClubCommand extends Command {
  constructor(
    public name: string,
    guid?: string,
  ) {
    super(guid);
  }
}

@injectable()
export class CreateClubCommandHandler implements CommandHandler<CreateClubCommand> {
  commandToHandle: string = CreateClubCommand.name;

  constructor(@inject(TYPES.ClubRepository) private readonly _repository: ClubRepository) {}

  handle(command: CreateClubCommand): Task<void, CommandError> {
    return new Task((resolve, reject) => {
      const asyncFn = async () => {
        const club: Club = new Club(command.name);

        try {
          await this._repository.create(club);
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
