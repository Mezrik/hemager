import { ContestTypeEnum, GenderEnum } from '@/common/enums';

export type CreateContestInput = {
  name: string;
  organizerName: string;
  federationName: string;
  contestType: ContestTypeEnum;
  gender: GenderEnum;
  date: Date;
};
