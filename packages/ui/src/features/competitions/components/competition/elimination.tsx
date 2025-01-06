import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trans } from '@lingui/macro';
import { FC } from 'react';

export const Elimination: FC = ({}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Trans>Elimination has not started yet</Trans>
        </CardTitle>
      </CardHeader>
      <CardContent>
        The group rounds need to be completed before the elimination rounds can be started.
      </CardContent>
    </Card>
  );
};
