import { RefereeDto } from "./contest";
import { RoundParticipantDto } from "./round";

export type GroupDto = {
  id: string;
  name: string;
  roundId: string;
  participants: RoundParticipantDto[];
  referee?: RefereeDto;
};
