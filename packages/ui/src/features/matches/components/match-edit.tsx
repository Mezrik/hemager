import { APIError, MatchDto, MatchStateChange } from '@hemager/api-types';
import { Trans } from '@lingui/macro';
import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { Result } from 'true-myth';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/ui/use-toast';

import { getMatchesQueryOptions } from '../api/get-matches';
import { useUpdateMatch } from '../api/update-match';

import { MatchStateAxis } from './match-state-axis';
import { Timer } from './timer';

type MatchEditProps = {
  match?: MatchDto;
};

export const MatchEdit: FC<MatchEditProps> = ({ match }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const matchMutation = useUpdateMatch({
    mutationConfig: {
      onSuccess: async () => {
        match?.groupId &&
          (await queryClient.invalidateQueries({
            queryKey: getMatchesQueryOptions(match?.groupId).queryKey,
          }));
      },
    },
  });

  if (!match) {
    return <div>Match not found</div>;
  }

  console.log(match);

  const [participantOne, participantTwo] = match.participants;

  const [participantOnePoints, participantTwoPoints] = match.points;

  const handleError = (result: Result<void, APIError>) => {
    result.unwrapOrElse((err) => {
      toast({
        description: err.cause,
        variant: 'destructive',
      });
    });
  };

  const handleMatchStart = () => {
    void matchMutation
      .mutateAsync({
        data: { matchId: match.id, change: MatchStateChange.matchStart },
      })
      .then(handleError);
  };

  const handlePointAdd = (point: number, pointsTo: string) => {
    void matchMutation
      .mutateAsync({
        data: { matchId: match.id, change: MatchStateChange.pointAdded, point, pointsTo },
      })
      .then(handleError);
  };

  const handleFightStart = () => {
    void matchMutation
      .mutateAsync({
        data: { matchId: match.id, change: MatchStateChange.fightStart },
      })
      .then(handleError);
  };

  const handleFightPause = () => {
    void matchMutation
      .mutateAsync({
        data: { matchId: match.id, change: MatchStateChange.fightStop },
      })
      .then(handleError);
  };

  const handleMatchEnd = () => {
    void matchMutation
      .mutateAsync({
        data: { matchId: match.id, change: MatchStateChange.matchEnd },
      })
      .then(handleError);
  };

  const matchInProgress = !!match.matchStart && !match.matchEnd;

  const winner = match.participants.find(
    (participant) => participant.contestant.id === match.winner,
  )?.contestant;

  return (
    <>
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center gap-4">
          <div>
            {participantOne.contestant.firstname} {participantOne.contestant.surname}
          </div>
          <div className="flex size-14 items-center justify-center rounded bg-primary text-xl text-primary-foreground">
            {participantOnePoints}
          </div>

          <div>
            {matchInProgress && (
              <Button
                onClick={() => handlePointAdd(1, participantOne.contestant.id)}
                disabled={!match.paused}
              >
                <Trans>Add point</Trans>
              </Button>
            )}
          </div>
        </div>

        <div className="text-xl">
          <Trans>vs</Trans>
        </div>

        <div className="flex flex-row-reverse items-center gap-4">
          <div>
            {participantTwo.contestant.firstname} {participantTwo.contestant.surname}
          </div>
          <div className="flex size-14 items-center justify-center rounded bg-primary text-xl text-primary-foreground">
            {participantTwoPoints}
          </div>

          <div>
            {matchInProgress && (
              <Button
                onClick={() => handlePointAdd(1, participantTwo.contestant.id)}
                disabled={!match.paused}
              >
                <Trans>Add point</Trans>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center py-4">
        {matchInProgress && (
          <div className="flex gap-2">
            <Timer states={match.matchStates} />

            <Button onClick={match.paused ? handleFightStart : handleFightPause}>
              {match.paused ? <Trans>Unpause</Trans> : <Trans>Pause</Trans>}
            </Button>

            <Button onClick={handleMatchEnd}>
              <Trans>End match</Trans>
            </Button>
          </div>
        )}

        {!matchInProgress && !match.matchEnd && (
          <Button onClick={handleMatchStart}>Start match</Button>
        )}

        {match.matchEnd && (
          <Trans>
            Match ended - winner: {winner?.firstname} {winner?.surname}
          </Trans>
        )}
      </div>

      <div className="flex grow justify-center overflow-y-auto">
        <MatchStateAxis match={match} />
      </div>
    </>
  );
};
