import { Country, GenderEnum } from "./enums";

export type CreateContestantInput = {
  firstname: string;
  surname: string;

  clubId?: string;
  birthdate?: Date;
  gender?: GenderEnum;
  rating?: number;
  nationality?: Country;
};

export type UpdateContestantInput = {
  id: string;

  firstname: string;
  surname: string;

  clubId?: string;
  birthdate?: Date;
  gender?: GenderEnum;
  rating?: number;
  nationality?: Country;
};

export type ClubDto = {
  id: string;
  name: string;
};

export type CreateClubInput = {
  name: string;
};

export type UpdateClubInput = {
  id: string;
  name: string;
};

export type ContestantDto = {
  id: string;
  firstname: string;
  surname: string;
  club?: ClubDto;
  birthdate?: Date;
  gender?: GenderEnum;
  rating?: number;

  hasMissingInfo?: number;
};
