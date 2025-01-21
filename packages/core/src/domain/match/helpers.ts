import { MatchStateChange } from '@hemager/api-types';
import { MatchState } from './match-state';

export const getContestantMatchPoints = (contestantId: string, matchStates: MatchState[]) => {
  return matchStates.reduce((acc, state) => {
    if (
      state.change === MatchStateChange.pointAdded &&
      state.pointToContestantId === contestantId
    ) {
      return acc + (state.points ?? 1);
    }
    return acc;
  }, 0);
};
