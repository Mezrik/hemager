import { Sequelize } from 'sequelize';
import { MigrationFn } from 'umzug';

export type Seeder = MigrationFn<Sequelize>;
