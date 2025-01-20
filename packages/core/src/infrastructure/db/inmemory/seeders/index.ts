// codegen:start {preset: barrel, include: './*.ts', import: star, export: {name: seeds, keys: path}}
import * as clubSeeder from './club-seeder';
import * as contestSeeder from './contest-seeder';
import * as contestantSeeder from './contestant-seeder';

export const seeds = {
  './club-seeder': clubSeeder,
  './contest-seeder': contestSeeder,
  './contestant-seeder': contestantSeeder,
};
// codegen:end
