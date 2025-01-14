import { Club } from './club.model.ts';
import { ContestCategory } from './contest-category.model.ts';
import { Contest } from './contest.model.ts';
import { Contestant } from './contestant.model.ts';
import { GroupParticipant } from './group-participant.model.ts';
import { Group } from './group.model.ts';
import { MatchParticipant } from './match-participant.model.ts';
import { MatchState } from './match-state.model.ts';
import { Match } from './match.model.ts';
import { Referee } from './referee.model.ts';
import { RoundParticipant } from './round-participant.model.ts';
import { Round } from './round.model.ts';
import { Weapon } from './weapon.model.ts';

export const models = [
  Contest,
  ContestCategory,
  Weapon,
  Round,
  Group,
  Referee,
  Contestant,
  Club,
  RoundParticipant,
  GroupParticipant,
  Match,
  MatchParticipant,
  MatchState,
];
