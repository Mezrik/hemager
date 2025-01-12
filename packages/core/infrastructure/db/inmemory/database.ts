import { Sequelize } from 'sequelize-typescript';
import { Competition } from './models/competition.model';

export const database = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  models: [__dirname + '/models/**/*.model.ts'],
  repositoryMode: true,
});

try {
  database.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
