import { Repository } from '@/common/interfaces';

import { Club } from './club';
import { Contestant } from './contestant';

export interface ContestantRepository extends Repository<Contestant> {
  findByClubId(clubId: string): Promise<Club | null>;
}
