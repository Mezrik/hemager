import { FC } from 'react';
import { useCompetitionsGroups } from '../../api/get-groups';
import { useParticipants } from '@/features/competitors/api/get-participants';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { pathnames } from '@/app/pathnames';
import { mapParticipantsByGroup } from '../../helpers';
import { Trans } from '@lingui/macro';
import { Button } from '@/components/ui/button';
import { useInitializeGroups } from '../../api/initialize-groups';
import { useCompetition } from '../../api/get-competition';

type GroupsProps = {
  competitionId: UUID;
};

export const Groups: FC<GroupsProps> = ({ competitionId }) => {
  const groupsQuery = useCompetitionsGroups({ competitionId });
  const participantQuery = useParticipants({ competitionId });

  const competitionQuery = useCompetition({
    competitionId,
  });

  const initializeGroups = useInitializeGroups();

  if (groupsQuery.isLoading || participantQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const participantsByGroup = mapParticipantsByGroup(participantQuery.data ?? []);

  if (!competitionQuery.data?.parameters) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Trans>The competition does not have any parameters set</Trans>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Trans>
            You need to set the parameters for the competition before you can create groups.
          </Trans>
        </CardContent>
      </Card>
    );
  }

  if (groupsQuery.data?.length === 0 && competitionQuery.data?.parameters) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Trans>No groups found</Trans>
          </CardTitle>

          <CardDescription>
            <Trans>
              No groups found for this competition. You can initialize new groups by clicking the
              button below.
            </Trans>
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => initializeGroups.mutate({ data: { competitionId } })}>
            <Trans>Initialize groups</Trans>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {groupsQuery.data?.map((group) => (
        <Link to={pathnames.buildCompetitionGroupPath(group.id, competitionId)} key={group.id}>
          <Card className="col-span-4 sm:col-span-2 md:col-span-1 hover:bg-gray-50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>{group.name}</CardTitle>
              <CardDescription>
                <Trans>Piste: {group.pisteNumber}</Trans>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ul className="divide-y divide-gray-200">
                {participantsByGroup?.[group.id]?.map((participant) => (
                  <li className="py-1">
                    {participant.competitor.firstname} {participant.competitor.surname}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
