import { Task } from "true-myth";

import {
  CategoryDto,
  ContestDto,
  CreateContestInput,
  InitializeGroupsInput,
  UpdateContestInput,
  WeaponDto,
} from "./contest";
import {
  ClubDto,
  ContestantDto,
  CreateClubInput,
  CreateContestantInput,
  UpdateClubInput,
  UpdateContestantInput,
} from "./contestant";
import { APIError } from "./errors";
import { GroupDto } from "./group";
import { MatchDto, MatchUpdateInput } from "./match";
import { AssignParticipantsInput, RoundParticipantDto } from "./round";

export type API = {
  contest: {
    create: (payload: CreateContestInput) => Task<void, APIError>;
    update: (payload: UpdateContestInput) => Task<void, APIError>;
    getAll: () => Task<ContestDto[], APIError>;
    getAllCategories: () => Task<CategoryDto[], APIError>;
    getAllWeapons: () => Task<WeaponDto[], APIError>;
    getOne(id: string): Task<ContestDto, APIError>;

    initGroups: (payload: InitializeGroupsInput) => Task<void, APIError>;
    getAllParticipants: (id: string) => Task<RoundParticipantDto[], APIError>;
    assignParticipants: (payload: AssignParticipantsInput) => Task<void, APIError>;
  };
  contestant: {
    create: (payload: CreateContestantInput) => Task<void, APIError>;
    update: (payload: UpdateContestantInput) => Task<void, APIError>;
    getAll: () => Task<ContestantDto[], APIError>;
    getOne: (id: string) => Task<ContestantDto, APIError>;
  };
  club: {
    create: (payload: CreateClubInput) => Task<void, APIError>;
    update: (payload: UpdateClubInput) => Task<void, APIError>;
    getAll: () => Task<ClubDto[], APIError>;
    getOne: (id: string) => Task<ClubDto, APIError>;
  };
  group: {
    getOne: (id: string) => Task<GroupDto, APIError>;
    getAll: (roundId: string) => Task<GroupDto[], APIError>;
  };
  match: {
    getOne: (id: string) => Task<MatchDto, APIError>;
    getAll: (groupId: string) => Task<MatchDto[], APIError>;
    update: (payload: MatchUpdateInput) => Task<void, APIError>;
  };
};

declare type FunctionPropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in Extract<keyof T, string>]: T[K] extends Function ? K : never;
}[Extract<keyof T, string>];

export type APIPath<N, T> = `${N & string}.${FunctionPropertyNames<T>}`;

export type APIPaths<T> = {
  [N in keyof T]: APIPath<N, T[N]>;
}[keyof T];

export declare type APIPathUnion = APIPaths<API>;
