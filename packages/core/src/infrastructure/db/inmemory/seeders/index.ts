// codegen:start {preset: barrel, include: './*.ts', import: star, export: {name: seeds, keys: path}}
import * as baseSeed from './base-seed';

export const seeds = {
  './base-seed': baseSeed,
};
// codegen:end
