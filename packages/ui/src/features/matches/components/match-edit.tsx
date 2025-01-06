import { Trans } from '@lingui/macro';
import { FC } from 'react';
import { useMatch } from '../api/get-match';
import { MatchParticipant } from '../types';
import { processMatchState } from '../helpers';
import { MatchChangeEnum, MatchDetail } from '@/generated/server';

type MatchEditProps = {
  matchId: UUID;
  participantsById: Record<UUID, MatchParticipant>;
  match?: MatchDetail;
};

export const MatchEdit: FC<MatchEditProps> = ({ matchId, participantsById, match }) => {
  if (!match) {
    return <div>Match not found</div>;
  }

  const participantOne = participantsById[match.participantOneId];
  const participantTwo = participantsById[match.participantTwoId];

  const matchState = processMatchState(match.state, participantOne.id, participantTwo.id);

  const start = match.state.find((item) => item.change === MatchChangeEnum.match_start);

  const end = match.state.find((item) => item.change === MatchChangeEnum.match_end);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between gap-4 items-center">
        <div className="flex gap-4 items-center">
          <div>
            {participantOne.firstname} {participantOne.surname}
          </div>
          <div className="rounded bg-primary text-primary-foreground text-xl size-14 flex items-center justify-center">
            {matchState.participantOneScore}
          </div>
        </div>

        <div className="text-xl">
          <Trans>vs</Trans>
        </div>

        <div className="flex flex-row-reverse gap-4 items-center">
          <div>
            {participantTwo.firstname} {participantTwo.surname}
          </div>
          <div className="rounded bg-primary text-primary-foreground text-xl size-14 flex items-center justify-center">
            {matchState.participantTwoScore}
          </div>
        </div>
      </div>
      {start && <div>00:01:30</div>}
      <div className="flex flex-col gap-2">
        {match.state.map((item) => (
          <div key={item.id} className="flex  gap-4">
            {item.change}{' '}
            <span className="font-semibold">
              {item.change === MatchChangeEnum.point_added &&
                (item.pointTo === participantOne.id
                  ? `${participantOne.firstname} ${participantOne.surname}`
                  : `${participantTwo.firstname} ${participantTwo.surname}`)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
