import { ContestTypeEnum, GenderEnum } from '@hemager/api-types';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { QueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { BasicPageLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateCompetition } from '@/features/competitions/api/create-competition';
import { getCompetitionsQueryOptions } from '@/features/competitions/api/get-competitions';
import { RecentCompetitions } from '@/features/competitions/components/recent-competitions';

export const dashboardLoader = (queryClient: QueryClient) => async () => {
  // const query = getCompetitionsQueryOptions();

  // return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));

  return [];
};

export const DashboardRoute = () => {
  const { _ } = useLingui();

  const { mutate } = useCreateCompetition();

  console.log(window.electron);

  return (
    <div>
      <Button
        onClick={() =>
          mutate({
            data: {
              name: 'string',
              organizerName: 'string',
              federationName: 'string',
              contestType: ContestTypeEnum.national,
              gender: GenderEnum.male,
              date: new Date(),
              categoryId: 'string',
              weaponId: 'string',
            },
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
