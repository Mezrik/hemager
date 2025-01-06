import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CompetitionResult } from '@/generated/server';
import { formatUIDate } from '@/utils/date';
import { msg, Trans } from '@lingui/macro';
import { FC, useState } from 'react';
import { getCompetionTypeCaption, getGenderCaption } from '../../helpers';
import { InfoList, InfoListItem } from '@/components/ui/info-list';
import { ParticipantsList } from '../../../competitors/components/participant/participants-list';
import { AssignParticipant } from '../../../competitors/components/participant/assign-participant';
import { Button } from '@/components/ui/button';
import { useLingui } from '@lingui/react';

export const Overview: FC<{ competition: CompetitionResult }> = ({ competition }) => {
  const { _ } = useLingui();
  const [showAssignParticipant, setShowAssignParticipant] = useState(false);

  return (
    <div className="grid grid-cols-4 gap-4 w-full">
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
              description={getCompetionTypeCaption(competition.competitionType, _)}
            />
            <InfoListItem title={_(msg`Category`)} description={competition.category.name} />
            <InfoListItem title={_(msg`Weapon`)} description={competition.weapon.name} />
            <InfoListItem
              title={_(msg`Gender`)}
              description={getGenderCaption(competition.gender, _)}
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
          <CardTitle className="flex gap-4 items-center">
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
