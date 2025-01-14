export enum ContestTypeEnum {
  national = 'national',
  international = 'international',
}

export enum GenderEnum {
  male = 'male',
  female = 'female',
  mixed = 'mixed',
}

export type CreateContestInput = {
  name: string;
  organizerName: string;
  federationName: string;
  contestType: ContestTypeEnum;
  gender: GenderEnum;
  date: Date;
};
