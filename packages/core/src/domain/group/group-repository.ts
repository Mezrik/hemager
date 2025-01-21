import { Repository } from '@/common/interfaces';

import { Group } from './group';
import { GroupMatchResult } from './group-match-result';
import { Transaction } from '@/common/interfaces/transaction';

export interface GroupRepository extends Repository<Group> {
  findByRoundId(roundId: string): Promise<Group[]>;
  insertResults(result: GroupMatchResult[], transaction?: Transaction): Promise<void>;
}
