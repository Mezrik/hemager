import { Repository } from '@/common/interfaces';
import { Transaction } from '@/common/interfaces/transaction';

import { Match } from './match';

export interface MatchRepository extends Repository<Match> {
  findByGroupId(groupId: string): Promise<Match[]>;
  bulkCreate(matches: Match[], transaction?: Transaction): Promise<void>;
}
