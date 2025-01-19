import { ContestantDto } from "./contestant";

export type RoundParticipantDto = {
  roundId: string;
  contestant: ContestantDto;
};

export type AssignParticipantsInput = {
  contestId: string;
  participants: string[];
};
