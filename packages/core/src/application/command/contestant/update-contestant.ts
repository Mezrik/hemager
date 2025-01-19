import { GenderEnum } from '@hemager/api-types';
import { inject, injectable } from 'inversify';
import Task from 'true-myth/task';

import { Command } from '@/common/command';
import { CommandError, CommandErrorTypes, ensureThrownError } from '@/common/errors';
import { CommandHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { Contestant } from '@/domain/contestant/contestant';
import { ContestantRepository } from '@/domain/contestant/contestant-repository';

export class UpdateContestantCommand extends Command {
  constructor(
    public id: string,
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
export class UpdateContestantCommandHandler implements CommandHandler<UpdateContestantCommand> {
  commandToHandle: string = UpdateContestantCommand.name;

  constructor(
    @inject(TYPES.ContestantRepository) private readonly _repository: ContestantRepository,
  ) {}

  handle(command: UpdateContestantCommand): Task<void, CommandError> {
    return new Task((resolve, reject) => {
      const asyncFn = async () => {
        const existingContestant = await this._repository.findOne(command.id);

        if (!existingContestant) {
          reject({ cause: 'Contestant not found', type: CommandErrorTypes.NOT_FOUND });
          return;
        }

        const club = command.clubId
          ? await this._repository.findByClubId(command.clubId)
          : undefined;

        if (command.clubId && !club) {
          reject({ cause: 'Club not found', type: CommandErrorTypes.NOT_FOUND });
          return;
        }

        const contestant: Contestant = new Contestant({
          firstname: command.firstname ?? existingContestant.firstname,
          surname: command.surname ?? existingContestant.surname,
          birthdate: command.birthdate ?? existingContestant.birthdate,
          gender: command.gender ?? existingContestant.gender,
          rating: command.rating ?? existingContestant.rating,

          club: club ?? existingContestant.club ?? undefined,
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
