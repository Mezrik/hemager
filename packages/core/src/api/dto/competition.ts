enum CompetitionTypeEnum {
  national = 'national',
  international = 'international',
}

enum GenderEnum {
  male = 'male',
  female = 'female',
  mixed = 'mixed',
}

export type CreateCompetitionInput = {
  name: string;
  organizerName: string;
  federationName: string;
  competitionType: CompetitionTypeEnum;
  gender: GenderEnum;
  date: Date;
};
