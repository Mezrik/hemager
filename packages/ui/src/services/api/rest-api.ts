import {
  CompetitionCategoryResult,
  CompetitionResult,
  CreateCompetitionCommand,
  getCompetitorsCompetitorId,
  getCompetitions,
  getCompetitionsCategories,
  postCompetitions,
  getCompetitionsCompetitionId,
  WeaponResult,
  getCompetitionsWeapons,
  CompetitorResult,
  CreateCompetitorCommand,
  getCompetitors,
  postCompetitors,
  CompetitionGroup,
  MatchDetail,
  Match,
  CompetitionParticipant,
  getCompetitionsCompetitionIdGroups,
  getCompetitionsCompetitionIdGroupsGroupId,
  getMatchesMatchId,
  getMatchesGroupIdAll,
  getCompetitorsAllCompetitionId,
  postCompetitorsAssignParticipants,
  postCompetitorsImport,
  UpdateCompetitorCommand,
  putCompetitorsCompetitorId,
  postCompetitionsCompetitionIdGroupsInitialize,
  CompetitionDetail,
  putCompetitionsCompetitionIdParameters,
  UpdateCompetitionParametersCommand,
  putCompetitionsCompetitionId,
} from '@/generated/server';
import { Api } from './api';

export class RestApi implements Api {
  GetCompetitions(): Promise<Array<CompetitionResult>> {
    return getCompetitions();
  }

  GetCompetition(id: UUID): Promise<CompetitionDetail> {
    return getCompetitionsCompetitionId(id);
  }

  CreateCompetition(data: CreateCompetitionCommand): Promise<void> {
    return postCompetitions(data);
  }

  GetCompetitionsCategories(): Promise<Array<CompetitionCategoryResult>> {
    return getCompetitionsCategories();
  }

  GetCompetitionsWeapons(): Promise<Array<WeaponResult>> {
    return getCompetitionsWeapons();
  }

  GetCompetitors(): Promise<Array<CompetitorResult>> {
    return getCompetitors();
  }

  GetCompetitor(id: UUID): Promise<CompetitorResult> {
    return getCompetitorsCompetitorId(id);
  }

  CreateCompetitor(data: CreateCompetitorCommand): Promise<void> {
    return postCompetitors(data);
  }

  UpdateCompetitor(competitorId: UUID, data: UpdateCompetitorCommand): Promise<void> {
    return putCompetitorsCompetitorId(competitorId, data);
  }

  GetCompetitionsGroups(competitionId: UUID): Promise<Array<CompetitionGroup>> {
    return getCompetitionsCompetitionIdGroups(competitionId);
  }

  GetGroup(groupId: UUID, competitionId: UUID): Promise<CompetitionGroup> {
    return getCompetitionsCompetitionIdGroupsGroupId(competitionId, groupId);
  }

  GetMatch(id: UUID): Promise<MatchDetail> {
    return getMatchesMatchId(id);
  }

  GetMatches(groupId: UUID): Promise<Array<Match>> {
    return getMatchesGroupIdAll(groupId);
  }

  GetParticipants(competitionId: UUID): Promise<Array<CompetitionParticipant>> {
    return getCompetitorsAllCompetitionId(competitionId);
  }

  AssignParticipants(competitorIds: UUID[], competitionId: UUID): Promise<void> {
    return postCompetitorsAssignParticipants({ competitionId, participantIds: competitorIds });
  }

  ImportCompetitor(file: File): Promise<void> {
    return postCompetitorsImport({ file: new Blob([file]) });
  }

  InitializeGroups(competitionId: UUID): Promise<void> {
    return postCompetitionsCompetitionIdGroupsInitialize(competitionId);
  }

  UpdateCompetitionParameters(
    competitionId: UUID,
    data: UpdateCompetitionParametersCommand,
  ): Promise<void> {
    return putCompetitionsCompetitionIdParameters(competitionId, data);
  }

  UpdateCompetition(id: UUID, data: CreateCompetitionCommand): Promise<void> {
    return putCompetitionsCompetitionId(id, data);
  }
}
