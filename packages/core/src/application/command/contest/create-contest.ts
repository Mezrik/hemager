import { ContestTypeEnum, GenderEnum } from '@hemager/api-types';
import { inject, injectable } from 'inversify';
import Task from 'true-myth/task';

import { Command } from '@/common/command';
import { CommandError, CommandErrorTypes, ensureThrownError } from '@/common/errors';
import { CommandHandler } from '@/common/interfaces';
import { TransactionManager } from '@/common/interfaces/transaction-manager';
import { TYPES } from '@/di-types';
import { Contest } from '@/domain/contest/contest';
import { ContestRepository } from '@/domain/contest/contest-repository';
import { RoundRepository } from '@/domain/round/round-repository';

export class CreateContestCommand extends Command {
  constructor(
    public name: string,
    public date: Date,
    public organizerName?: string,
    public federationName?: string,
    public contestType?: ContestTypeEnum,
    public gender?: GenderEnum,
    public weaponId?: string,
    public categoryId?: string,
    guid?: string,
  ) {
    super(guid);
  }
}

@injectable()
export class CreateContestCommandHandler implements CommandHandler<CreateContestCommand> {
  commandToHandle: string = CreateContestCommand.name;

  constructor(
    @inject(TYPES.ContestRepository) private readonly _repository: ContestRepository,
    @inject(TYPES.RoundRepository) private readonly _roundRepository: RoundRepository,
    @inject(TYPES.TransactionManager) private readonly _transactionManager: TransactionManager,
  ) {}

  handle(command: CreateContestCommand): Task<void, CommandError> {
    return new Task((resolve, reject) => {
      void this._transactionManager.execute(async (transaction) => {
        const weapon = command.weaponId
          ? await this._repository.getWeapon(command.weaponId)
          : undefined;

        const category = command.categoryId
          ? await this._repository.getCategory(command.categoryId)
          : undefined;

        if (command.weaponId && !weapon) {
          reject({ cause: 'Weapon not found', type: CommandErrorTypes.NOT_FOUND });
          return;
        }

        if (command.categoryId && !category) {
          reject({ cause: 'Category not found', type: CommandErrorTypes.NOT_FOUND });
          return;
        }

        const contest: Contest = new Contest({
          name: command.name,
          organizerName: command.organizerName,
          federationName: command.federationName,
          contestType: command.contestType,
          gender: command.gender,
          date: command.date,

          weapon,
          category,
        });

        try {
          await this._repository.create(contest, transaction);

          const firstRound = contest.rounds[0];

          await this._roundRepository.create(firstRound, transaction);
        } catch (err) {
          const error = ensureThrownError(err);
          reject({ cause: error.message, type: CommandErrorTypes.CAUGHT_EXCEPTION });
        }

        resolve();
      });
    });
  }
}
