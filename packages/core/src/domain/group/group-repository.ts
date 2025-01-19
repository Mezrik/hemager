import { Repository } from '@/common/interfaces';

import { Group } from './group';

export interface GroupRepository extends Repository<Group> {
  findByRoundId(roundId: string): Promise<Group[]>;
}
