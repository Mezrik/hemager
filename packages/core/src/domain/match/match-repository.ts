import { Repository } from '@/common/interfaces';

import { Match } from './match';
import { Transaction } from '@/common/interfaces/transaction';

export interface MatchRepository extends Repository<Match> {
  findByGroupId(groupId: string): Promise<Match[]>;
  bulkCreate(matches: Match[], transaction?: Transaction): Promise<void>;
}
