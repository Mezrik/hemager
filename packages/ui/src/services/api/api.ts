import {
  CompetitionCategoryResult,
  CompetitionResult,
  CompetitorResult,
  CreateCompetitionCommand,
  CreateCompetitorCommand,
  WeaponResult,
  CompetitionGroup,
  Match,
  MatchDetail,
  CompetitionParticipant,
  UpdateCompetitorCommand,
  CompetitionDetail,
  UpdateCompetitionParametersCommand,
} from '@/generated/server';
import { DesktopApi } from './desktop-api';
import { RestApi } from './rest-api';

// TODO: Generate this automatically from generated/server generated/wailsjs
// Could use Hygen for this
export interface Api {
  GetCompetitions(): Promise<Array<CompetitionResult>>;

  GetCompetition(id: UUID): Promise<CompetitionDetail>;

  CreateCompetition(data: CreateCompetitionCommand): Promise<void>;

  GetCompetitionsCategories(): Promise<Array<CompetitionCategoryResult>>;

  GetCompetitionsWeapons(): Promise<Array<WeaponResult>>;

  GetCompetitors(): Promise<Array<CompetitorResult>>;

  GetCompetitor(id: UUID): Promise<CompetitorResult>;

  CreateCompetitor(data: CreateCompetitorCommand): Promise<void>;

  UpdateCompetitor(id: UUID, data: UpdateCompetitorCommand): Promise<void>;

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

  UpdateCompetition(id: UUID, data: CreateCompetitionCommand): Promise<void>;
}

export const api: Api = import.meta.env.MODE === 'desktop' ? new DesktopApi() : new RestApi();
