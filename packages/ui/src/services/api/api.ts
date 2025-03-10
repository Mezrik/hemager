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
  InitializeGroupsInput,
  GroupDto,
  RoundParticipantDto,
  MatchDto,
  MatchUpdateInput,
  ClubDto,
  ContestResultDto,
} from '@hemager/api-types';
import { Result } from 'true-myth';

import { UpdateCompetitionParametersCommand } from '@/generated/server';

import { DesktopApi } from './desktop-api';
import { RestApi } from './rest-api';

// TODO: Generate this automatically from generated/server generated/wailsjs
// Could use Hygen for this
export interface Api {
  GetCompetitions(): Promise<Result<Array<ContestDto>, APIError>>;

  GetCompetition(id: UUID): Promise<Result<ContestDto, APIError>>;

  GetContestResults(id: UUID): Promise<Result<ContestResultDto[], APIError>>;

  CreateCompetition(data: CreateContestInput): Promise<Result<void, APIError>>;

  UpdateCompetition(data: UpdateContestInput): Promise<Result<void, APIError>>;

  GetCompetitionsCategories(): Promise<Result<Array<CategoryDto>, APIError>>;

  GetCompetitionsWeapons(): Promise<Result<Array<WeaponDto>, APIError>>;

  GetCompetitors(): Promise<Result<ContestantDto[], APIError>>;

  GetCompetitor(id: UUID): Promise<Result<ContestantDto, APIError>>;

  CreateCompetitor(data: CreateContestantInput): Promise<Result<void, APIError>>;

  UpdateCompetitor(
    id: UUID,
    command: Omit<UpdateContestantInput, 'id'>,
  ): Promise<Result<void, APIError>>;

  GetCompetitionsGroups(roundId: UUID): Promise<Result<GroupDto[], APIError>>;

  GetGroup(groupId: UUID): Promise<Result<GroupDto, APIError>>;

  GetMatch(id: UUID): Promise<Result<MatchDto, APIError>>;

  GetMatches(groupId: UUID): Promise<Result<MatchDto[], APIError>>;

  MatchUpdate(payload: MatchUpdateInput): Promise<Result<void, APIError>>;

  GetParticipants(competitionId: UUID): Promise<Result<RoundParticipantDto[], APIError>>;

  AssignParticipants(competitorId: UUID[], competitionId: UUID): Promise<Result<void, APIError>>;

  ImportCompetitor(file: File): Promise<void>;

  InitializeGroups(payload: InitializeGroupsInput): Promise<Result<void, APIError>>;

  GetClubs(): Promise<Result<ClubDto[], APIError>>;

  GetClub(id: UUID): Promise<Result<ClubDto, APIError>>;

  UpdateCompetitionParameters(
    competitionId: UUID,
    data: UpdateCompetitionParametersCommand,
  ): Promise<void>;
}

export const api: Api = import.meta.env.MODE === 'desktop' ? new DesktopApi() : new RestApi();
