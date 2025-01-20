import { ContestTypeEnum, GenderEnum } from '@hemager/api-types';

import type { Seeder } from '../types';

const seedCategories = [
  {
    id: 'yZO4hgh__htwOR8s0TOdk',
    name: 'Test Category',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const seedWeapons = [
  {
    id: 'KASn2TXTMNvOz6F0S8FeC',
    name: 'Test Weapon',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const seedRounds = [
  {
    id: 'd9xTwbMUiNWkyzEvwmgYT',
    contestId: 'woHmmGamnI68NHANv6ofK',
    previousRoundId: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const seedContest = [
  {
    id: 'woHmmGamnI68NHANv6ofK',
    name: 'Test Contest',
    organizerName: 'Test Organizer',
    federationName: 'Test Federation',
    contestType: ContestTypeEnum.international,
    gender: GenderEnum.male,
    date: new Date('2022-01-01T00:00:00.000Z'),

    weaponId: 'KASn2TXTMNvOz6F0S8FeC',
    categoryId: 'yZO4hgh__htwOR8s0TOdk',

    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert('ContestCategory', seedCategories);
  await sequelize.getQueryInterface().bulkInsert('Weapon', seedWeapons);
  await sequelize.getQueryInterface().bulkInsert('Contest', seedContest);
  await sequelize.getQueryInterface().bulkInsert('Round', seedRounds);
};
export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete('Contest', { id: seedContest.map((u) => u.id) });
  await sequelize
    .getQueryInterface()
    .bulkDelete('ContestCategory', { id: seedCategories.map((u) => u.id) });
  await sequelize.getQueryInterface().bulkDelete('Weapon', { id: seedWeapons.map((u) => u.id) });
  await sequelize.getQueryInterface().bulkDelete('Round', { id: seedRounds.map((u) => u.id) });
};
