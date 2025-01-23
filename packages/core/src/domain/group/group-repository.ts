import { Repository } from '@/common/interfaces';
import { Transaction } from '@/common/interfaces/transaction';

import { Group } from './group';
import { GroupMatchResult } from './group-match-result';

export interface GroupRepository extends Repository<Group> {
  findByRoundId(roundId: string): Promise<Group[]>;
  insertResults(result: GroupMatchResult[], transaction?: Transaction): Promise<void>;
}
