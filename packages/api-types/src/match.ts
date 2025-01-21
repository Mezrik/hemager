import { MatchStateChange } from "./enums";
import { RoundParticipantDto } from "./round";

export type MatchStateDto = {
  id: string;
  change: MatchStateChange;
  matchId: string;
  pointToContestantId?: string;
  points?: number;
  timestamp?: Date;
};

export type MatchDto = {
  id: string;
  groupId: string;
  participants: [RoundParticipantDto, RoundParticipantDto];
  matchStates: MatchStateDto[];
  matchStart?: Date;
  matchEnd?: Date;
  paused?: boolean;
  winner?: string;
  points: [number, number];
};

export type MatchUpdateInput = {
  matchId: string;
  change: MatchStateChange;
  pointsTo?: string;
  point?: number;
};
