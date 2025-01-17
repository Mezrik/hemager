import { Task } from "true-myth";

import {
  CategoryDto,
  ContestDto,
  CreateContestInput,
  UpdateContestInput,
  WeaponDto,
} from "./contest";
import { APIError } from "./errors";

export type API = {
  contest: {
    create: (payload: CreateContestInput) => Task<void, APIError>;
    update: (payload: UpdateContestInput) => Task<void, APIError>;
    getAll: () => Task<ContestDto[], APIError>;
    getAllCategories: () => Task<CategoryDto[], APIError>;
    getAllWeapons: () => Task<WeaponDto[], APIError>;
    getOne(id: string): Task<ContestDto, APIError>;
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
