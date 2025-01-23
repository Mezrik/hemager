import {
  ContestDto,
  APIError,
  CreateContestInput,
  UpdateContestInput,
  CategoryDto,
  WeaponDto,
  ContestantDto,
  CreateContestantInput,
  UpdateContestantInput,
  GroupDto,
  MatchDto,
  RoundParticipantDto,
  InitializeGroupsInput,
} from '@hemager/api-types';
import { Result } from 'true-myth';

import { UpdateCompetitionParametersCommand } from '@/generated/server';

import { Api } from './api';

export class RestApi implements Api {
  GetCompetitions(): Promise<Result<Array<ContestDto>, APIError>> {
    throw new Error('Method not implemented.');
  }
  GetCompetition(id: UUID): Promise<Result<ContestDto, APIError>> {
    throw new Error('Method not implemented.');
  }
  CreateCompetition(data: CreateContestInput): Promise<Result<void, APIError>> {
    throw new Error('Method not implemented.');
  }
  UpdateCompetition(
    id: UUID,
    data: Omit<UpdateContestInput, 'id'>,
  ): Promise<Result<void, APIError>> {
    throw new Error('Method not implemented.');
  }
  GetCompetitionsCategories(): Promise<Result<Array<CategoryDto>, APIError>> {
    throw new Error('Method not implemented.');
  }
  GetCompetitionsWeapons(): Promise<Result<Array<WeaponDto>, APIError>> {
    throw new Error('Method not implemented.');
  }
  GetCompetitors(): Promise<Result<ContestantDto[], APIError>> {
    throw new Error('Method not implemented.');
  }
  GetCompetitor(id: UUID): Promise<Result<ContestantDto, APIError>> {
    throw new Error('Method not implemented.');
  }
  CreateCompetitor(data: CreateContestantInput): Promise<Result<void, APIError>> {
    throw new Error('Method not implemented.');
  }
  UpdateCompetitor(
    id: UUID,
    command: Omit<UpdateContestantInput, 'id'>,
  ): Promise<Result<void, APIError>> {
    throw new Error('Method not implemented.');
  }
  GetCompetitionsGroups(roundId: UUID): Promise<Result<GroupDto[], APIError>> {
    throw new Error('Method not implemented.');
  }
  GetGroup(groupId: UUID): Promise<Result<GroupDto, APIError>> {
    throw new Error('Method not implemented.');
  }
  GetMatch(id: UUID): Promise<Result<MatchDto, APIError>> {
    throw new Error('Method not implemented.');
  }
  GetMatches(groupId: UUID): Promise<Result<MatchDto[], APIError>> {
    throw new Error('Method not implemented.');
  }
  GetParticipants(competitionId: UUID): Promise<Result<RoundParticipantDto[], APIError>> {
    throw new Error('Method not implemented.');
  }
  AssignParticipants(competitorId: UUID[], competitionId: UUID): Promise<Result<void, APIError>> {
    throw new Error('Method not implemented.');
  }
  ImportCompetitor(file: File): Promise<void> {
    throw new Error('Method not implemented.');
  }
  InitializeGroups(payload: InitializeGroupsInput): Promise<Result<void, APIError>> {
    throw new Error('Method not implemented.');
  }
  UpdateCompetitionParameters(
    competitionId: UUID,
    data: UpdateCompetitionParametersCommand,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
