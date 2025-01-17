// codegen:start {preset: barrel, include: './*.ts', import: star, export: {name: seeds, keys: path}}
import * as clubSeeder from './club-seeder';
import * as contestSeeder from './contest-seeder';

export const seeds = {
  './club-seeder': clubSeeder,
  './contest-seeder': contestSeeder,
};
// codegen:end
