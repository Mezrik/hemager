import type { Seeder } from '../types';

const seedClubs = [
  {
    id: 'X23m7cPHtxc8JM9r6RxGT',
    name: 'TestClub',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: 'IbassxWXafTl5icqes8eU',
    name: 'TestClub 2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert('Club', seedClubs);
};
export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete('Club', { id: seedClubs.map((u) => u.id) });
};
