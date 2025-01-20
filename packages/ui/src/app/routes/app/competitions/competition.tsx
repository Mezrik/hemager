import { APIError } from '@hemager/api-types';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { PencilIcon } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { BasicPageLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCompetition } from '@/features/competitions/api/get-competition';
import {
  Overview,
  Groups,
  Elimination,
  Referees,
} from '@/features/competitions/components/competition';
import { UpdateCompetition } from '@/features/competitions/components/dialog/update-competition';
import { UpdateCompetitionParameters } from '@/features/competitions/components/dialog/update-competition-parameters';

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

  const competition = competitionQuery.data?.unwrapOrElse<APIError>((err) => err);

  if (!competition || 'cause' in competition) {
    return <div>Competition not found {competition?.cause}</div>;
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
        parameters={{
          eliminationHits: competition.eliminationHits,
          groupHits: competition.groupHits,
          deploymentCriteria: competition.deploymentCriteria,
          expectedParticipants: competition.expectedParticipants,
        }}
      />

      <UpdateCompetition id={competition.id} onOpenChange={setShowUpdate} open={showUpdate} />
    </BasicPageLayout>
  );
};
