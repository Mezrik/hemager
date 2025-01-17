import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { CZ } from 'country-flag-icons/react/3x2';
import { ComponentProps, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { pathnames } from '@/app/pathnames';
import { BasicPageLayout } from '@/components/layouts';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCompetitionGroup } from '@/features/competitions/api/get-group';
import {
  mapParticipantsByCompetitorId,
  mapParticipantsByGroup,
} from '@/features/competitions/helpers';
import { useParticipants } from '@/features/competitors/api/get-participants';
import { useMatches } from '@/features/matches/api/get-matches';
import { MatchCard } from '@/features/matches/components/match-card';
import { MatchPreview } from '@/features/matches/components/match-preview';

export const GroupRoute = () => {
  const { _ } = useLingui();
  const params = useParams();
  const [showMatchPreview, setShowMatchPreview] = useState<UUID | null>(null);

  const navigate = useNavigate();

  const groupId = params.groupId as string;
  const competitionId = params.competitionId as string;

  const groupQuery = useCompetitionGroup({ groupId, competitionId });
  const participantQuery = useParticipants({ competitionId });
  const matchesQuery = useMatches({ groupId });

  if (groupQuery.isLoading || participantQuery.isLoading || matchesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const group = groupQuery.data;

  if (!group) {
    return <div>Group not found</div>;
  }

  const participantsByGroup = mapParticipantsByGroup(participantQuery.data ?? []);

  const participantsByCompetitorId = mapParticipantsByCompetitorId(participantQuery.data ?? []);

  return (
    <BasicPageLayout title={group.name} subtitle={_(msg`Group`)}>
      <div className="grid grid-cols-9 gap-4">
        <Card className="col-span-9 pt-6 lg:col-span-4">
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">{_(msg`Nation`)}</TableHead>
                  <TableHead>{_(msg`Name`)}</TableHead>
                  <TableHead>{_(msg`Deployment No.`)}</TableHead>
                  <TableHead>{_(msg`Points`)}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participantsByGroup?.[group.id]?.map((participant) => (
                  <TableRow>
                    <TableCell>
                      <CZ title={_(msg`Czech Republic`)} className="size-6" />
                    </TableCell>
                    <TableCell>
                      {participant.competitor.firstname} {participant.competitor.surname}
                    </TableCell>
                    <TableCell>{participant.deploymentNumber}</TableCell>
                    <TableCell>{participant.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="col-span-9 pt-6 lg:col-span-5">
          <CardContent>
            <h3 className="text-primary-foreground mb-2 text-lg font-semibold">
              {_(msg`Round 1`)}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {matchesQuery.data?.map((match) => {
                const one = participantsByCompetitorId?.[match.participantOneId];
                const two = participantsByCompetitorId?.[match.participantTwoId];
                return (
                  one &&
                  two && (
                    <div className="col-span-1">
                      <MatchCard
                        key={match.id}
                        match={match}
                        participantOne={{ ...one.competitor, points: 0 }}
                        participantTwo={{ ...two.competitor, points: 0 }}
                        onPreview={() => setShowMatchPreview(match.id)}
                        onEdit={() => navigate(pathnames.buildMatchPath(match.id, competitionId))}
                      />
                    </div>
                  )
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      <MatchPreview
        matchId={showMatchPreview ?? ''}
        participantsById={Object.values(participantsByCompetitorId).reduce(
          (acc, participant) => {
            acc[participant.competitor.id] = participant.competitor;

            return acc;
          },
          {} as ComponentProps<typeof MatchPreview>['participantsById'],
        )}
        onOpenChange={() => setShowMatchPreview(null)}
        open={!!showMatchPreview}
      />
    </BasicPageLayout>
  );
};
