import { Sequelize } from 'sequelize-typescript';
import { Umzug, SequelizeStorage } from 'umzug';

import { models } from './models';
import * as seedClubs from './seeders/base-seed.ts';

export const database = new Sequelize({
  dialect: 'sqlite',
  storage: __dirname + '/database.db', //':memory:',
  models,
  repositoryMode: true,
});

export const seeder = new Umzug({
  migrations: {
    glob: ['seeders/*.ts', { cwd: __dirname }],
  },
  context: database,
  storage: new SequelizeStorage({
    sequelize: database,
    modelName: 'seeder_meta',
  }),
  logger: console,
});

export type Seeder = typeof seeder._types.migration;

// TEMP: For development purposes
await database.sync();
