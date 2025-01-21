import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { BasicPageLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useMatch } from '@/features/matches/api/get-match';
import { MatchEdit } from '@/features/matches/components/match-edit';

export const MatchEditRoute = () => {
  const { _ } = useLingui();
  const navigate = useNavigate();

  const params = useParams();

  const matchQuery = useMatch({ matchId: params.matchId as string });

  const match = matchQuery.data?.unwrapOrElse((err) => err);

  if (match && 'cause' in match) {
    return <div>{match.cause}</div>;
  }

  if (matchQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BasicPageLayout
      title={_(msg`Match edit`)}
      actions={
        <Button onClick={() => navigate(-1)}>
          <ChevronLeft className="mr-2 size-4" />
          <Trans>Go back</Trans>
        </Button>
      }
      className="flex min-h-0 flex-col"
    >
      <MatchEdit match={match} />
    </BasicPageLayout>
  );
};
