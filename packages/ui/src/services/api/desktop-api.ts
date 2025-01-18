import type {
  APIError,
  ContestDto,
  CreateContestInput,
  CategoryDto,
  WeaponDto,
} from '@hemager/api-types';
import { Result } from 'true-myth';

import { UpdateCompetitionParametersCommand } from '@/generated/server';
import {
  GetCompetitionsWeapons,
  CreateCompetitor,
  GetCompetitors,
  GetCompetitionsGroups,
  GetGroup,
  GetMatch,
  GetMatches,
  GetParticipants,
  AssignCompetitors,
  UpdateCompetitor,
  InitializeGroups,
  GetCompetitor,
} from '@/generated/wailsjs/go/desktop/Admin';
import { command, query } from '@/generated/wailsjs/go/models';
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

  GetCompetitionsCategories(): Promise<Result<Array<CategoryDto>, APIError>> {
    return unwrapTask(window.electron.contest.getAllCategories());
  }

  GetCompetitionsWeapons(): Promise<Result<Array<WeaponDto>, APIError>> {
    return unwrapTask(window.electron.contest.getAllWeapons());
  }

  CreateCompetitor(command: command.CreateCompetitor): Promise<void> {
    return CreateCompetitor(command);
  }

  UpdateCompetitor(id: UUID, command: Omit<command.UpdateCompetitor, 'id'>): Promise<void> {
    return UpdateCompetitor({ id, ...command });
  }

  GetCompetitors(): Promise<Array<query.Competitor>> {
    return GetCompetitors();
  }

  GetCompetitor(id: UUID): Promise<query.Competitor> {
    return GetCompetitor(id);
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

  UpdateCompetition(): Promise<void> {
    return Promise.resolve();
  }
}
