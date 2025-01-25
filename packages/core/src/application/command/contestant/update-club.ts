import { inject, injectable } from 'inversify';
import Task from 'true-myth/task';

import { Command } from '@/common/command';
import { CommandError, CommandErrorTypes, ensureThrownError } from '@/common/errors';
import { CommandHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { Club } from '@/domain/contestant/club';
import { ClubRepository } from '@/domain/contestant/club-repository';

export class UpdateClubCommand extends Command {
  constructor(
    public id: string,
    public name: string,
    guid?: string,
  ) {
    super(guid);
  }
}

@injectable()
export class UpdateClubCommandHandler implements CommandHandler<UpdateClubCommand> {
  commandToHandle: string = UpdateClubCommand.name;

  constructor(@inject(TYPES.ClubRepository) private readonly _repository: ClubRepository) {}

  handle(command: UpdateClubCommand): Task<void, CommandError> {
    return new Task((resolve, reject) => {
      const asyncFn = async () => {
        const existingClub = await this._repository.findOne(command.id);

        if (!existingClub) {
          reject({ cause: 'Club not found', type: CommandErrorTypes.NOT_FOUND });
          return;
        }

        const club: Club = new Club(command.name, {
          id: existingClub.id,
          createdAt: existingClub.createdAt,
          updatedAt: new Date(),
        });

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
