import { MatchDto, MatchStateChange, MatchStateDto, RoundParticipantDto } from '@hemager/api-types';
import { FC } from 'react';
import { convertDurationToString, mapStateChangeToCaption } from '../helpers';
import { Trans } from '@lingui/macro';
import { intervalToDuration } from 'date-fns';
import { formatUIDateWithTime } from '@/utils/date';
import { cn } from '@/utils/class-names';

const MatchStateBubble: FC<{ state: MatchStateDto; className?: string }> = ({
  state,
  className,
}) => {
  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center bg-primary text-center text-primary-foreground',
        className,
      )}
    >
      {mapStateChangeToCaption(state)}
    </div>
  );
};

const MatchStateEntry: FC<{
  state: MatchStateDto;
  start?: Date;
  participants: [RoundParticipantDto, RoundParticipantDto];
}> = ({ state, start, participants }) => {
  const duration =
    start && state.timestamp ? intervalToDuration({ start, end: state.timestamp }) : { seconds: 0 };

  const pointToLeft = state.pointToContestantId === participants[0].contestant.id;
  const pointToRight = state.pointToContestantId === participants[1].contestant.id;

  const info = (
    <div className="flex gap-4 pb-2 border-b-2 border-gray-200 ">
      <div className="flex gap-1">
        <span className="font-bold">
          <Trans>Elapsed:</Trans>
        </span>
        {convertDurationToString(duration)}
      </div>
      <div className="flex gap-1">
        <span className="font-bold">
          <Trans>Time:</Trans>
        </span>
        {state.timestamp ? formatUIDateWithTime(state.timestamp) : null}
      </div>
    </div>
  );

  if (!pointToLeft && !pointToRight) {
    return (
      <div className={cn('flex gap-6 items-center flex-col px-20 justify-center w-fit')}>
        {state.change !== MatchStateChange.matchEnd && (
          <MatchStateBubble state={state} className="bg-gray-200 p-2" />
        )}
        {info}
        {state.change === MatchStateChange.matchEnd && (
          <MatchStateBubble state={state} className="bg-gray-200 p-2" />
        )}
      </div>
    );
  }

  return (
    <div className={cn('flex gap-6 items-center')}>
      {pointToLeft ? (
        <MatchStateBubble state={state} className="size-14" />
      ) : (
        <div className="size-14"></div>
      )}

      {info}

      {pointToRight ? (
        <MatchStateBubble state={state} className="size-14" />
      ) : (
        <div className="size-14"></div>
      )}
    </div>
  );
};

export const MatchStateAxis: FC<{ match: MatchDto }> = ({ match }) => {
  const matchStart = match.matchStart;

  const states = match.matchStates;

  return (
    <div className="flex flex-col relative py-6 gap-4 w-fit">
      {states.map((state) => (
        <MatchStateEntry state={state} start={matchStart} participants={match.participants} />
      ))}
    </div>
  );
};
