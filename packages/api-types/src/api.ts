import {
  CategoryDto,
  ContestDto,
  CreateContestInput,
  UpdateContestInput,
  WeaponDto,
} from "./contest";

export type API = {
  contest: {
    create: (payload: CreateContestInput) => Promise<void>;
    update: (payload: UpdateContestInput) => Promise<void>;
    getAll: () => Promise<ContestDto[]>;
    getAllCategories: () => Promise<CategoryDto[]>;
    getAllWeapons: () => Promise<WeaponDto[]>;
    getOne(id: string): Promise<ContestDto>;
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
