import type { Seeder } from '../types';

const seedClubs = [
  {
    id: 'e2d73ee9-c885-4866-bdad-3faf862a7d1f',
    name: 'TestClub',
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
