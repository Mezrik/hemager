import { MatchStateChange } from '@hemager/api-types';

import { Match } from './match';
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

const compareMatches = (a: Match, b: Match) => {
  const [aParticipant1, aParticipant2] = a.participants;
  const [bParticipant1, bParticipant2] = b.participants;

  return (
    aParticipant1.contestant.id === bParticipant1.contestant.id ||
    aParticipant1.contestant.id === bParticipant2.contestant.id ||
    aParticipant2.contestant.id === bParticipant1.contestant.id ||
    aParticipant2.contestant.id === bParticipant2.contestant.id
  );
};
export const sortMatches = (matches: Match[]): { rest: Match[]; merged: Match[] } => {
  const el = matches.shift();

  return matches.length === 0
    ? { rest: [] as Match[], merged: [el] as Match[] }
    : insert(el!, sortMatches(matches));
};

const insert = (el: Match, result: { rest: Match[]; merged: Match[] }) => {
  result.rest.unshift(el);

  for (let i = 0; i < result.rest.length; i++) {
    const restItem = result.rest[i];
    for (let j = 0; j < result.merged.length; j++) {
      const mergedItem = result.merged[j];
      if (!compareMatches(mergedItem, restItem)) {
        if (!compareMatches(result.merged[result.merged.length - 1], restItem)) {
          result.merged.push(restItem);
          result.rest.splice(i, 1);
          i = -1;
          break;
        }

        if (!compareMatches(result.merged[0], restItem)) {
          result.merged.unshift(restItem);
          result.rest.splice(i, 1);
          i = -1;
          break;
        }

        if (result.merged[j + 1] && !compareMatches(result.merged[j + 1], restItem)) {
          result.merged.splice(j + 1, 0, restItem);
          result.rest.splice(i, 1);
          i = -1;
          break;
        }
      }
    }
  }
  return result;
};
