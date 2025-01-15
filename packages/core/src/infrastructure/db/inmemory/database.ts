import { Sequelize } from 'sequelize-typescript';
import { Umzug, SequelizeStorage } from 'umzug';

import { models } from './models';
import { seeds } from './seeders';

export const database = new Sequelize({
  dialect: 'sqlite',
  storage: __dirname + '/database.db', //':memory:',
  models,
  repositoryMode: true,
  logging: false,
});

export const seeder = new Umzug({
  migrations: Object.entries(seeds).map(([path, seed]) => {
    const name = path.replace('./', '');

    return { name, ...seed };
  }),
  context: database,
  storage: new SequelizeStorage({
    sequelize: database,
    modelName: 'seeder_meta',
  }),
  logger: console,
});

// TEMP: For development purposes
await database.sync();

await seeder.up();
