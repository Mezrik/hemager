import { Repository } from '@/common/interfaces';

import { Match } from './match';

export interface MatchRepository extends Repository<Match> {
  findByGroupId(groupId: string): Promise<Match[]>;
}
