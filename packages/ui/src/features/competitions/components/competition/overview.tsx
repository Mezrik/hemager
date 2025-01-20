import { ContestDto } from '@hemager/api-types';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { FC, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InfoList, InfoListItem } from '@/components/ui/info-list';
import { formatUIDate } from '@/utils/date';

import { AssignParticipant } from '../../../competitors/components/participant/assign-participant';
import { ParticipantsList } from '../../../competitors/components/participant/participants-list';
import { getCompetionTypeCaption, getGenderCaption } from '../../helpers';

export const Overview: FC<{ competition: ContestDto }> = ({ competition }) => {
  const { _ } = useLingui();
  const [showAssignParticipant, setShowAssignParticipant] = useState(false);

  return (
    <div className="grid w-full grid-cols-4 gap-4">
      <Card className="col-span-4 md:col-span-1">
        <CardHeader>
          <CardTitle>
            <Trans>Basic information</Trans>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InfoList>
            <InfoListItem title={_(msg`Organizer`)} description={competition.organizerName} />
            <InfoListItem title={_(msg`Federation`)} description={competition.federationName} />
            <InfoListItem
              title={_(msg`Scope of competition`)}
              description={
                competition.contestType
                  ? getCompetionTypeCaption(competition.contestType, _)
                  : undefined
              }
            />
            <InfoListItem title={_(msg`Category`)} description={competition.category?.name} />
            <InfoListItem title={_(msg`Weapon`)} description={competition.weapon?.name} />
            <InfoListItem
              title={_(msg`Gender`)}
              description={competition.gender ? getGenderCaption(competition.gender, _) : undefined}
            />
            <InfoListItem
              title={_(msg`Date of the event`)}
              description={formatUIDate(competition.date)}
            />
          </InfoList>
        </CardContent>
      </Card>
      <Card className="col-span-4 md:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <Trans>List of competitors</Trans>
            <Button onClick={() => setShowAssignParticipant(true)} variant="secondary" size="sm">
              <Trans>Assign competitor</Trans>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ParticipantsList competitionId={competition.id} />
        </CardContent>
      </Card>
      <AssignParticipant
        competitionId={competition.id}
        onOpenChange={setShowAssignParticipant}
        open={showAssignParticipant}
      />
    </div>
  );
};
