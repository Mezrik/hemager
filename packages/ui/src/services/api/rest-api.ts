import {
  CompetitionResult,
  CompetitionDetail,
  CreateCompetitionCommand,
  CompetitionCategoryResult,
  WeaponResult,
  CompetitorResult,
  CreateCompetitorCommand,
  UpdateCompetitorCommand,
  CompetitionGroup,
  MatchDetail,
  Match,
  CompetitionParticipant,
  UpdateCompetitionParametersCommand,
} from '@/generated/server';

import { Api } from './api';

export class RestApi implements Api {
  GetCompetitions(): Promise<Array<CompetitionResult>> {
    throw new Error('Method not implemented.');
  }
  GetCompetition(id: UUID): Promise<CompetitionDetail> {
    throw new Error('Method not implemented.');
  }
  CreateCompetition(data: CreateCompetitionCommand): Promise<void> {
    throw new Error('Method not implemented.');
  }
  GetCompetitionsCategories(): Promise<Array<CompetitionCategoryResult>> {
    throw new Error('Method not implemented.');
  }
  GetCompetitionsWeapons(): Promise<Array<WeaponResult>> {
    throw new Error('Method not implemented.');
  }
  GetCompetitors(): Promise<Array<CompetitorResult>> {
    throw new Error('Method not implemented.');
  }
  GetCompetitor(id: UUID): Promise<CompetitorResult> {
    throw new Error('Method not implemented.');
  }
  CreateCompetitor(data: CreateCompetitorCommand): Promise<void> {
    throw new Error('Method not implemented.');
  }
  UpdateCompetitor(id: UUID, data: UpdateCompetitorCommand): Promise<void> {
    throw new Error('Method not implemented.');
  }
  GetCompetitionsGroups(competitionId: UUID): Promise<Array<CompetitionGroup>> {
    throw new Error('Method not implemented.');
  }
  GetGroup(groupId: UUID, competitionId: UUID): Promise<CompetitionGroup> {
    throw new Error('Method not implemented.');
  }
  GetMatch(id: UUID): Promise<MatchDetail> {
    throw new Error('Method not implemented.');
  }
  GetMatches(groupId: UUID): Promise<Array<Match>> {
    throw new Error('Method not implemented.');
  }
  GetParticipants(competitionId: UUID): Promise<Array<CompetitionParticipant>> {
    throw new Error('Method not implemented.');
  }
  AssignParticipants(competitorId: UUID[], competitionId: UUID): Promise<void> {
    throw new Error('Method not implemented.');
  }
  ImportCompetitor(file: File): Promise<void> {
    throw new Error('Method not implemented.');
  }
  InitializeGroups(competitionId: UUID): Promise<void> {
    throw new Error('Method not implemented.');
  }
  UpdateCompetitionParameters(
    competitionId: UUID,
    data: UpdateCompetitionParametersCommand,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
  UpdateCompetition(id: UUID, data: CreateCompetitionCommand): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
