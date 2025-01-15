import { Repository } from '@/common/interfaces';

import { ContestCategory } from './category.js';
import { Contest } from './contest.js';
import { Weapon } from './weapon.js';

export interface ContestRepository extends Repository<Contest> {
  getWeapon(id: string): Promise<Weapon>;
  getAllWeapons(): Promise<Weapon[]>;

  getCategory(id: string): Promise<ContestCategory>;
  getAllCategories(): Promise<ContestCategory[]>;
}
