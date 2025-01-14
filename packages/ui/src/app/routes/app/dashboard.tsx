import { BasicPageLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCompetitionsQueryOptions } from '@/features/competitions/api/get-competitions';
import { RecentCompetitions } from '@/features/competitions/components/recent-competitions';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { QueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { CompetitionTypeEnum, GenderEnum } from '@hemager/core';

export const dashboardLoader = (queryClient: QueryClient) => async () => {
  // const query = getCompetitionsQueryOptions();

  // return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));

  return [];
};

export const DashboardRoute = () => {
  const { _ } = useLingui();

  return (
    <div>
      <Button
        onClick={() =>
          window.electron.competition.create({
            name: 'string',
            organizerName: 'string',
            federationName: 'string',
            competitionType: CompetitionTypeEnum.national,
            gender: GenderEnum.male,
            date: new Date(),
          })
        }
      >
        Click me
      </Button>
    </div>
  );
  // return (
  //   <BasicPageLayout title={_(msg`Dashboard`)}>
  //     <Card className="col-span-3">
  //       <CardHeader>
  //         <CardTitle>
  //           <Trans>Recent competitions</Trans>
  //         </CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <RecentCompetitions />
  //       </CardContent>
  //     </Card>
  //   </BasicPageLayout>
  // );
};
