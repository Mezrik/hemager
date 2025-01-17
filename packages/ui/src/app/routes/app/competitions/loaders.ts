import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';

import { getCompetitionQueryOptions } from '@/features/competitions/api/get-competition';
import { getCompetitionsQueryOptions } from '@/features/competitions/api/get-competitions';
import { getCompetitionGroupQueryOptions } from '@/features/competitions/api/get-group';
import { getParticipantsQueryOptions } from '@/features/competitors/api/get-participants';
import { getMatchQueryOptions } from '@/features/matches/api/get-match';
import { getMatchesQueryOptions } from '@/features/matches/api/get-matches';

export const competitionsLoader = (queryClient: QueryClient) => async (_: LoaderFunctionArgs) => {
  const query = getCompetitionsQueryOptions();

  return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};

export const competitionLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const competitionId = params.competitionId as string;

    const query = getCompetitionQueryOptions(competitionId);

    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
  };

export const groupLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const groupId = params.groupId as string;
    const competitionId = params.competitionId as string;

    const query = getCompetitionGroupQueryOptions(competitionId, groupId);
    const participantQuery = getParticipantsQueryOptions(competitionId);
    const matchesQuery = getMatchesQueryOptions(groupId);

    return (
      (queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))) &&
      (queryClient.getQueryData(participantQuery.queryKey) ??
        (await queryClient.fetchQuery(participantQuery))) &&
      (queryClient.getQueryData(matchesQuery.queryKey) ??
        (await queryClient.fetchQuery(matchesQuery)))
    );
  };

export const matchEditLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const query = getMatchQueryOptions(params.matchId as string);

    const participantQuery = getParticipantsQueryOptions(params.competitionId as string);

    return Promise.all([
      queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query)),
      queryClient.getQueryData(participantQuery.queryKey) ??
        (await queryClient.fetchQuery(participantQuery)),
    ]);
  };
