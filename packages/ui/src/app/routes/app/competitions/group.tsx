import { APIError } from '@hemager/api-types';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { CZ } from 'country-flag-icons/react/3x2';
import { useState } from 'react';
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
import { useParticipants } from '@/features/competitors/api/get-participants';
import { useMatches } from '@/features/matches/api/get-matches';
import { MatchCard } from '@/features/matches/components/match-card';
import { MatchPreview } from '@/features/matches/components/match-preview';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export const GroupRoute = () => {
  const { _ } = useLingui();
  const params = useParams();
  const [showMatchPreview, setShowMatchPreview] = useState<UUID | null>(null);

  const navigate = useNavigate();

  const groupId = params.groupId as string;
  const competitionId = params.competitionId as string;

  const groupQuery = useCompetitionGroup({ groupId, competitionId });
  const matchesQuery = useMatches({ groupId });

  if (groupQuery.isLoading || matchesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const group = groupQuery.data?.unwrapOrElse<APIError>((err) => err);
  const matches = matchesQuery.data?.unwrapOrElse<APIError>((err) => err);

  console.log(group, matches);
  if ((group && 'cause' in group) || (matches && 'cause' in matches)) {
    return <div>Error: {(group as APIError).cause || (matches as APIError).cause}</div>;
  }

  if (!group) {
    return <div>Group not found</div>;
  }

  return (
    <BasicPageLayout
      title={group.name}
      subtitle={_(msg`Group`)}
      actions={
        <Button onClick={() => navigate(-1)}>
          <ChevronLeft className="mr-2 size-4" />
          <Trans>Go back</Trans>
        </Button>
      }
    >
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
                {group?.participants.map((participant) => (
                  <TableRow key={participant.contestant.id}>
                    <TableCell>
                      <CZ title={_(msg`Czech Republic`)} className="size-6" />
                    </TableCell>
                    <TableCell>
                      {participant.contestant.firstname} {participant.contestant.surname}
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
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
              {matches?.map((match) => {
                const [one, two] = match.participants ?? [];
                const [onePoints, twoPoints] = match.points ?? [];

                return (
                  one &&
                  two && (
                    <div className="col-span-1">
                      <MatchCard
                        key={match.id}
                        match={match}
                        participantOne={{ ...one?.contestant, points: onePoints }}
                        participantTwo={{ ...two?.contestant, points: twoPoints }}
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
        onOpenChange={() => setShowMatchPreview(null)}
        open={!!showMatchPreview}
      />
    </BasicPageLayout>
  );
};
