import { inject, injectable } from 'inversify';

import { Command } from '@/common/command';
import { CommandHandler } from '@/common/interfaces';
import { TYPES } from '@/di-types';
import { Contest, ContestTypeEnum, GenderEnum } from '@/domain/contest/contest';
import { ContestRepository } from '@/domain/contest/contest-repository';

export class CreateContestCommand extends Command {
  constructor(
    public name: string,
    public organizerName: string,
    public federationName: string,
    public contestType: ContestTypeEnum,
    public gender: GenderEnum,
    public date: Date,
    guid?: string,
  ) {
    super(guid);
  }
}

@injectable()
export class CreateContestCommandHandler implements CommandHandler<CreateContestCommand> {
  commandToHandle: string = CreateContestCommand.name;

  constructor(@inject(TYPES.ContestRepository) private readonly _repository: ContestRepository) {}

  async handle(command: CreateContestCommand): Promise<{ id: string }> {
    const contest: Contest = new Contest({
      name: command.name,
      organizerName: command.organizerName,
      federationName: command.federationName,
      contestType: command.contestType,
      gender: command.gender,
      date: command.date,
    });

    await this._repository.create(contest.id, contest);

    return { id: contest.id };
  }
}
