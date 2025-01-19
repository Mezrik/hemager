import { GenderEnum } from "./enums";

export type CreateContestantInput = {
  firstname: string;
  surname: string;

  clubId?: string;
  birthdate?: Date;
  gender?: GenderEnum;
  rating?: number;
};

export type UpdateContestantInput = {
  id: string;

  firstname: string;
  surname: string;

  clubId?: string;
  birthdate?: Date;
  gender?: GenderEnum;
  rating?: number;
};

export type ClubDto = {
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
};
