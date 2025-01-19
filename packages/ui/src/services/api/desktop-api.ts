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
} from '@hemager/api-types';
import { Result } from 'true-myth';

import { UpdateCompetitionParametersCommand } from '@/generated/server';
import {
  GetCompetitionsGroups,
  GetGroup,
  GetMatch,
  GetMatches,
  GetParticipants,
  AssignCompetitors,
  InitializeGroups,
} from '@/generated/wailsjs/go/desktop/Admin';
import { query } from '@/generated/wailsjs/go/models';
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

  UpdateCompetition(
    id: string,
    command: Omit<UpdateContestantInput, 'id'>,
  ): Promise<Result<void, APIError>> {
    return unwrapTask(window.electron.contest.update({ id, ...command }));
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

  GetCompetitionsGroups(competitionId: UUID): Promise<Array<query.Group>> {
    return GetCompetitionsGroups(competitionId);
  }

  GetGroup(groupId: UUID): Promise<query.Group> {
    return GetGroup(groupId);
  }

  GetMatch(id: UUID): Promise<query.MatchDetail> {
    return GetMatch(id);
  }

  GetMatches(groupId: UUID): Promise<Array<query.Match>> {
    return GetMatches(groupId);
  }

  GetParticipants(competitionId: UUID): Promise<Array<query.Participant>> {
    return GetParticipants(competitionId);
  }

  AssignParticipants(competitorIds: UUID[], competitionId: UUID): Promise<void> {
    return AssignCompetitors(competitorIds, competitionId);
  }

  ImportCompetitor(): Promise<void> {
    return Promise.resolve();
  }

  InitializeGroups(competitionId: UUID): Promise<void> {
    return InitializeGroups(competitionId);
  }

  UpdateCompetitionParameters(
    competitionId: UUID,
    data: UpdateCompetitionParametersCommand,
  ): Promise<void> {
    return Promise.resolve();
  }
}
