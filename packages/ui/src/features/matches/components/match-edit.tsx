import { Trans } from '@lingui/macro';
import { FC } from 'react';

import { MatchChangeEnum, MatchDetail } from '@/generated/server';

import { useMatch } from '../api/get-match';
import { processMatchState } from '../helpers';
import { MatchParticipant } from '../types';

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
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            {participantOne.firstname} {participantOne.surname}
          </div>
          <div className="flex size-14 items-center justify-center rounded bg-primary text-xl text-primary-foreground">
            {matchState.participantOneScore}
          </div>
        </div>

        <div className="text-xl">
          <Trans>vs</Trans>
        </div>

        <div className="flex flex-row-reverse items-center gap-4">
          <div>
            {participantTwo.firstname} {participantTwo.surname}
          </div>
          <div className="flex size-14 items-center justify-center rounded bg-primary text-xl text-primary-foreground">
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
