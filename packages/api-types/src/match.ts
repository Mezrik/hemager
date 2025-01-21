import { MatchStateChange } from "./enums";
import { RoundParticipantDto } from "./round";

export type MatchStateDto = {
  id: string;
  change: MatchStateChange;
  matchId: string;
  pointToContestantId?: string;
  points?: number;
};

export type MatchDto = {
  id: string;
  groupId: string;
  participants: [RoundParticipantDto, RoundParticipantDto];
  matchStates: MatchStateDto[];
};
