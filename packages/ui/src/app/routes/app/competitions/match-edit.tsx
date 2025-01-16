import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { QueryClient } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import { ComponentProps } from 'react';
import { LoaderFunctionArgs, useNavigate, useParams } from 'react-router-dom';

import { BasicPageLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mapParticipantsByCompetitorId } from '@/features/competitions/helpers';
import {
  getParticipantsQueryOptions,
  useParticipants,
} from '@/features/competitors/api/get-participants';
import { getMatchQueryOptions, useMatch } from '@/features/matches/api/get-match';
import { MatchEdit } from '@/features/matches/components/match-edit';

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

export const MatchEditRoute = () => {
  const { _ } = useLingui();
  const navigate = useNavigate();

  const params = useParams();

  const matchQuery = useMatch({ matchId: params.matchId as string });

  const participantQuery = useParticipants({ competitionId: params.competitionId as string });

  if (matchQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const participantsByCompetitorId = mapParticipantsByCompetitorId(participantQuery.data ?? []);

  const participantsById = Object.values(participantsByCompetitorId).reduce(
    (acc, participant) => {
      acc[participant.competitor.id] = participant.competitor;

      return acc;
    },
    {} as ComponentProps<typeof MatchEdit>['participantsById'],
  );

  return (
    <BasicPageLayout
      title={_(msg`Match edit`)}
      actions={
        <Button onClick={() => navigate(-1)}>
          <ChevronLeft className="mr-2 size-4" />
          <Trans>Go back</Trans>
        </Button>
      }
    >
      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <MatchEdit
            match={matchQuery.data}
            participantsById={participantsById}
            matchId={params.matchId as string}
          />
        </CardContent>
      </Card>
    </BasicPageLayout>
  );
};
