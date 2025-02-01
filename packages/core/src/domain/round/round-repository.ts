import { Repository } from '@/common/interfaces';

import { Round } from './round';
import { RoundResult } from './round-result';

export interface RoundRepository extends Repository<Round> {
  findByContestId(contestId: string): Promise<Round[]>;
  assignParticipants(roundId: string, participants: string[]): Promise<void>;
  getRoundResults(roundId: string): Promise<RoundResult[]>;
}
