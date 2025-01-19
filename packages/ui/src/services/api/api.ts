import type {
  CreateContestInput,
  ContestDto,
  APIError,
  CategoryDto,
  WeaponDto,
  CreateContestantInput,
  ContestantDto,
  UpdateContestantInput,
  UpdateContestInput,
} from '@hemager/api-types';
import { Result } from 'true-myth';

import {
  CompetitionGroup,
  Match,
  MatchDetail,
  CompetitionParticipant,
  UpdateCompetitionParametersCommand,
} from '@/generated/server';

import { DesktopApi } from './desktop-api';
import { RestApi } from './rest-api';

// TODO: Generate this automatically from generated/server generated/wailsjs
// Could use Hygen for this
export interface Api {
  GetCompetitions(): Promise<Result<Array<ContestDto>, APIError>>;

  GetCompetition(id: UUID): Promise<Result<ContestDto, APIError>>;

  CreateCompetition(data: CreateContestInput): Promise<Result<void, APIError>>;

  GetCompetitionsCategories(): Promise<Result<Array<CategoryDto>, APIError>>;

  GetCompetitionsWeapons(): Promise<Result<Array<WeaponDto>, APIError>>;

  GetCompetitors(): Promise<Result<ContestantDto[], APIError>>;

  GetCompetitor(id: UUID): Promise<Result<ContestantDto, APIError>>;

  CreateCompetitor(data: CreateContestantInput): Promise<Result<void, APIError>>;

  UpdateCompetitor(
    id: UUID,
    command: Omit<UpdateContestantInput, 'id'>,
  ): Promise<Result<void, APIError>>;

  GetCompetitionsGroups(competitionId: UUID): Promise<Array<CompetitionGroup>>;

  GetGroup(groupId: UUID, competitionId: UUID): Promise<CompetitionGroup>;

  GetMatch(id: UUID): Promise<MatchDetail>;

  GetMatches(groupId: UUID): Promise<Array<Match>>;

  GetParticipants(competitionId: UUID): Promise<Array<CompetitionParticipant>>;

  AssignParticipants(competitorId: UUID[], competitionId: UUID): Promise<void>;

  ImportCompetitor(file: File): Promise<void>;

  InitializeGroups(competitionId: UUID): Promise<void>;

  UpdateCompetitionParameters(
    competitionId: UUID,
    data: UpdateCompetitionParametersCommand,
  ): Promise<void>;

  UpdateCompetition(
    id: UUID,
    data: Omit<UpdateContestInput, 'id'>,
  ): Promise<Result<void, APIError>>;
}

export const api: Api = import.meta.env.MODE === 'desktop' ? new DesktopApi() : new RestApi();
