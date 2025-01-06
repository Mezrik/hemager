import { BasicPageLayout } from '@/components/layouts';
import {
  getCompetitionQueryOptions,
  useCompetition,
} from '@/features/competitions/api/get-competition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Overview,
  Groups,
  Elimination,
  Referees,
} from '@/features/competitions/components/competition';

import { msg, Trans } from '@lingui/macro';
import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs, useParams } from 'react-router-dom';
import { PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLingui } from '@lingui/react';
import { UpdateCompetitionParameters } from '@/features/competitions/components/dialog/update-competition-parameters';
import { useState } from 'react';
import { UpdateCompetition } from '@/features/competitions/components/dialog/update-competition';

export const competitionLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const competitionId = params.competitionId as string;

    const query = getCompetitionQueryOptions(competitionId);

    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
  };

export const CompetitionRoute = () => {
  const { _ } = useLingui();
  const params = useParams();

  const [showUpdateParameters, setShowUpdateParameters] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const competitionId = params.competitionId as string;
  const competitionQuery = useCompetition({
    competitionId,
  });

  if (competitionQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const competition = competitionQuery.data;

  if (!competition) {
    return <div>Competition not found</div>;
  }

  return (
    <BasicPageLayout
      title={competition.name}
      subtitle={_(msg`Competition`)}
      actions={
        <div className="flex gap-2">
          <Button className="gap-2" variant="secondary" onClick={() => setShowUpdate(true)}>
            <PencilIcon className="size-4" />
            <span className="hidden sm:inline">
              <Trans>Edit basic info</Trans>
            </span>
          </Button>
          <Button className="gap-2" variant="default" onClick={() => setShowUpdateParameters(true)}>
            <PencilIcon className="size-4" />
            <span className="hidden sm:inline">
              <Trans>Edit parameters</Trans>
            </span>
          </Button>
        </div>
      }
    >
      <Tabs defaultValue="overview">
        <TabsList className="mb-2">
          <TabsTrigger value="overview">
            <Trans>Overview</Trans>
          </TabsTrigger>
          <TabsTrigger value="referees">
            <Trans>Referees</Trans>
          </TabsTrigger>
          <TabsTrigger value="groups">
            <Trans>Groups</Trans>
          </TabsTrigger>
          <TabsTrigger value="elimination">
            <Trans>Elimination</Trans>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Overview competition={competition} />
        </TabsContent>
        <TabsContent value="groups">
          <Groups competitionId={competition.id} />
        </TabsContent>
        <TabsContent value="elimination">
          <Elimination />
        </TabsContent>
        <TabsContent value="referees">
          <Referees />
        </TabsContent>
      </Tabs>

      <UpdateCompetitionParameters
        id={competition.id}
        onOpenChange={setShowUpdateParameters}
        open={showUpdateParameters}
        parameters={competition.parameters}
      />

      <UpdateCompetition id={competition.id} onOpenChange={setShowUpdate} open={showUpdate} />
    </BasicPageLayout>
  );
};
