import { FC } from 'react';
import { useCompetitions } from '../api/get-competitions';
import { Button } from '@/components/ui/button';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';
import { pathnames } from '@/app/pathnames';

export const RecentCompetitions: FC<{}> = () => {
  const competitionsQuery = useCompetitions({});

  if (competitionsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const competitions = competitionsQuery.data || [];

  return (
    <div className="space-y-8">
      {competitions.map((competition) => (
        <div className="flex items-center" key={competition.name}>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{competition.name}</p>
            <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet</p>
          </div>
          <div className="ml-auto font-medium">
            <Button asChild variant="link">
              <Link to={pathnames.buildCompetitionPath(competition.id)}>
                <Trans>View</Trans>
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
