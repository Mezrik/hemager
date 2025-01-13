import { Command } from '@/common/command';
import { CommandHandler } from '@/common/interfaces';
import { Competition, CompetitionTypeEnum, GenderEnum } from '@/domain/competition/competition';
import { CompetitionRepository } from '@/domain/competition/competition-repository';
import { TYPES } from '@/di-types';
import { inject, injectable } from 'inversify';

export class CreateCompetitionCommand extends Command {
  constructor(
    public name: string,
    public organizerName: string,
    public federationName: string,
    public competitionType: CompetitionTypeEnum,
    public gender: GenderEnum,
    public date: Date,
    guid?: string,
  ) {
    super(guid);
  }
}

@injectable()
export class CreateCompetitionCommandHandler implements CommandHandler<CreateCompetitionCommand> {
  commandToHandle: string = CreateCompetitionCommand.name;

  constructor(
    @inject(TYPES.CompetitionRepository) private readonly _repository: CompetitionRepository,
  ) {}

  async handle(command: CreateCompetitionCommand): Promise<{ id: string }> {
    const competition: Competition = new Competition({
      name: command.name,
      organizerName: command.organizerName,
      federationName: command.federationName,
      competitionType: command.competitionType,
      gender: command.gender,
      date: command.date,
    });

    await this._repository.create(competition.id, competition);

    return { id: competition.id };
  }
}
