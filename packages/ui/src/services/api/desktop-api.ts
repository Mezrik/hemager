import type {
  APIError,
  ContestDto,
  CreateContestInput,
  CategoryDto,
  WeaponDto,
  CreateContestantInput,
  ContestantDto,
  UpdateContestantInput,
  UpdateContestInput,
  InitializeGroupsInput,
  GroupDto,
  RoundParticipantDto,
  MatchDto,
  MatchUpdateInput,
} from '@hemager/api-types';
import { Result } from 'true-myth';

import { UpdateCompetitionParametersCommand } from '@/generated/server';
import { unwrapTask } from '@/lib/true-myth';

import { Api } from './api';

export class DesktopApi implements Api {
  GetCompetitions(): Promise<Result<Array<ContestDto>, APIError>> {
    return unwrapTask(window.electron.contest.getAll());
  }

  GetCompetition(id: UUID): Promise<Result<ContestDto, APIError>> {
    return unwrapTask(window.electron.contest.getOne(id));
  }

  CreateCompetition(command: CreateContestInput): Promise<Result<void, APIError>> {
    return unwrapTask(window.electron.contest.create(command));
  }

  UpdateCompetition(command: UpdateContestInput): Promise<Result<void, APIError>> {
    console.log('service', command);
    return unwrapTask(window.electron.contest.update(command));
  }

  GetCompetitionsCategories(): Promise<Result<Array<CategoryDto>, APIError>> {
    return unwrapTask(window.electron.contest.getAllCategories());
  }

  GetCompetitionsWeapons(): Promise<Result<Array<WeaponDto>, APIError>> {
    return unwrapTask(window.electron.contest.getAllWeapons());
  }

  CreateCompetitor(command: CreateContestantInput): Promise<Result<void, APIError>> {
    return unwrapTask(window.electron.contestant.create(command));
  }

  UpdateCompetitor(
    id: UUID,
    command: Omit<UpdateContestantInput, 'id'>,
  ): Promise<Result<void, APIError>> {
    return unwrapTask(window.electron.contestant.update({ id, ...command }));
  }

  GetCompetitors(): Promise<Result<ContestantDto[], APIError>> {
    return unwrapTask(window.electron.contestant.getAll());
  }

  GetCompetitor(id: UUID): Promise<Result<ContestantDto, APIError>> {
    return unwrapTask(window.electron.contestant.getOne(id));
  }

  GetCompetitionsGroups(roundId: UUID): Promise<Result<GroupDto[], APIError>> {
    return unwrapTask(window.electron.group.getAll(roundId));
  }

  GetGroup(groupId: UUID): Promise<Result<GroupDto, APIError>> {
    return unwrapTask(window.electron.group.getOne(groupId));
  }

  GetMatch(id: UUID): Promise<Result<MatchDto, APIError>> {
    return unwrapTask(window.electron.match.getOne(id));
  }

  GetMatches(groupId: UUID): Promise<Result<MatchDto[], APIError>> {
    return unwrapTask(window.electron.match.getAll(groupId));
  }

  MatchUpdate(payload: MatchUpdateInput): Promise<Result<void, APIError>> {
    return unwrapTask(window.electron.match.update(payload));
  }

  GetParticipants(competitionId: UUID): Promise<Result<RoundParticipantDto[], APIError>> {
    return unwrapTask(window.electron.contest.getAllParticipants(competitionId));
  }

  AssignParticipants(participants: UUID[], contestId: UUID): Promise<Result<void, APIError>> {
    return unwrapTask(
      window.electron.contest.assignParticipants({
        contestId,
        participants,
      }),
    );
  }

  ImportCompetitor(): Promise<void> {
    return Promise.resolve();
  }

  InitializeGroups(payload: InitializeGroupsInput): Promise<Result<void, APIError>> {
    return unwrapTask(window.electron.contest.initGroups(payload));
  }

  UpdateCompetitionParameters(
    competitionId: UUID,
    data: UpdateCompetitionParametersCommand,
  ): Promise<void> {
    return Promise.resolve();
  }
}
