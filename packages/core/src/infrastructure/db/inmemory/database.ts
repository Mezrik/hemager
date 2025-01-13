import { Sequelize } from 'sequelize-typescript';
import { models } from './models';

export const database = new Sequelize({
  dialect: 'sqlite',
  storage: __dirname + '/database.db', //':memory:',
  models,
  repositoryMode: true,
});

await database.sync();
