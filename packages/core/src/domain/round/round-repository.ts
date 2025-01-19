import { Repository } from '@/common/interfaces';

import { Round } from './round.js';

export interface RoundRepository extends Repository<Round> {
  findByContestId(contestId: string): Promise<Round[]>;
  assignParticipants(roundId: string, participants: string[]): Promise<void>;
}
