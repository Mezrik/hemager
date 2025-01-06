import { BasicPageLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import {
  getCompetitionsQueryOptions,
  useCompetitions,
} from '@/features/competitions/api/get-competitions';
import { CompetitionCard } from '@/features/competitions/components/competition-card';
import { CreateCompetition } from '@/features/competitions/components/dialog/create-competition';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { QueryClient } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

export const competitionsLoader = (queryClient: QueryClient) => async () => {
  const query = getCompetitionsQueryOptions();

  return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};

export const CompetitionsRoute = () => {
  const { _ } = useLingui();
  const [showCreate, setShowCreate] = useState(false);

  const competitionsQuery = useCompetitions({});

  if (competitionsQuery.isLoading) {
    return <BasicPageLayout title={_(msg`Competitions`)}>Loading...</BasicPageLayout>;
  }

  const competitions = competitionsQuery.data ?? [];

  return (
    <BasicPageLayout
      title={_(msg`Competitions`)}
      actions={
        <Button className="gap-2" variant="default" onClick={() => setShowCreate(true)}>
          <PlusIcon className="size-4" />
          <span className="hidden sm:inline">
            <Trans>Create competition</Trans>
          </span>
        </Button>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {competitions.map((comp) => (
          <CompetitionCard
            key={comp.id}
            name={comp.name}
            gender={comp.gender}
            date={comp.date}
            weapon={comp.weapon.name}
            competitionId={comp.id}
          />
        ))}
      </div>
      <CreateCompetition open={showCreate} onOpenChange={setShowCreate} />
    </BasicPageLayout>
  );
};
