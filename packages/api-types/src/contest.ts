import { ContestTypeEnum, DeploymentCriteria, GenderEnum } from "./enums";

export type CreateContestInput = {
  name: string;
  organizerName?: string;
  federationName?: string;
  contestType?: ContestTypeEnum;
  gender?: GenderEnum;
  date: Date;

  weaponId?: string;
  categoryId?: string;
};

export type UpdateContestInput = {
  id: string;
  name?: string;
  organizerName?: string;
  federationName?: string;
  contestType?: ContestTypeEnum;
  gender?: GenderEnum;
  date?: Date;

  weaponId?: string;
  categoryId?: string;

  expectedParticipants?: number;
  deploymentCriteria?: DeploymentCriteria[];
  groupHits?: number;
  eliminationHits?: number;
};

export type ContestDto = {
  id: string;
  name: string;
  organizerName?: string;
  federationName?: string;
  contestType?: ContestTypeEnum;
  gender?: GenderEnum;
  date: Date;
  weaponId?: string;
  categoryId?: string;
  expectedParticipants?: number;
  deploymentCriteria?: DeploymentCriteria[];
  groupHits?: number;
  eliminationHits?: number;
};

export type WeaponDto = {
  id: string;
  name: string;
};

export type CategoryDto = {
  id: string;
  name: string;
};

export type InitializeGroupsInput = {
  contestId: string;
  maxParticipantsPerGroup: number;
};
