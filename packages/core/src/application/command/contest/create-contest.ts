import { ContestTypeEnum, GenderEnum } from '@hemager/api';
import { inject, injectable } from 'inversify';

import { Command } from '@/common/command';
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
  ) {
    console.log(this.commandToHandle);
  }

  async handle(command: CreateContestCommand): Promise<{ id: string }> {
    return this._transactionManager.execute(async (transaction) => {
      const weapon = command.weaponId
        ? await this._repository.getWeapon(command.weaponId)
        : undefined;

      const category = command.categoryId
        ? await this._repository.getCategory(command.categoryId)
        : undefined;

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

      await this._repository.create(contest, transaction);

      const firstRound = contest.rounds[0];

      await this._roundRepository.create(firstRound, transaction);

      return { id: contest.id };
    });
  }
}
