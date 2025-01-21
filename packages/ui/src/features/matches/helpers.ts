import { MatchStateChange, MatchStateDto } from '@hemager/api-types';
import { differenceInMilliseconds, Duration, intervalToDuration } from 'date-fns';

export const convertDurationToString = (duration: Duration) => {
  return [
    duration.hours ? String(duration.hours).padStart(2, '0') : null,
    String(duration.minutes ?? 0).padStart(2, '0'),
    String(duration.seconds ?? 0).padStart(2, '0'),
  ]
    .filter(Boolean)
    .join(':');
};

export const statesToDuration = (states: MatchStateDto[]) => {
  const sortedStates = states
    .filter((state) => state.timestamp)
    .sort((a, b) => a.timestamp!.getTime() - b.timestamp!.getTime());

  let elapsedTime = 0;
  let activeStart: Date | null = null;

  for (const state of sortedStates) {
    switch (state.change) {
      case MatchStateChange.matchStart:
      case MatchStateChange.fightStart:
        if (!activeStart) {
          activeStart = state.timestamp!;
        }
        break;

      case MatchStateChange.fightStop:
      case MatchStateChange.matchEnd:
        if (activeStart) {
          elapsedTime += differenceInMilliseconds(state.timestamp!, activeStart);
          activeStart = null; // End the active period
        }
        break;
    }
  }

  if (activeStart) {
    elapsedTime += differenceInMilliseconds(new Date(), activeStart);
  }

  const duration = intervalToDuration({
    start: 0,
    end: elapsedTime,
  });

  return duration;
};

export const mapStateChangeToCaption = (state: MatchStateDto) => {
  switch (state.change) {
    case MatchStateChange.matchStart:
      return 'Match started';
    case MatchStateChange.matchEnd:
      return 'Match ended';
    case MatchStateChange.fightStart:
      return 'Fight started';
    case MatchStateChange.fightStop:
      return 'Fight paused';
    case MatchStateChange.pointAdded:
      return `+ ${state.points}`;
    case MatchStateChange.pointSubtracted:
      return `- ${state.points}`;

    default:
      return '???';
  }
};
