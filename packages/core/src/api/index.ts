import { Container } from 'inversify';

import { CommandBus, QueryBus } from '@/common/interfaces';
import { TYPES } from '@/di-types';

import { contestHandlers } from './handlers/contest';

type FunctionPropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in Extract<keyof T, string>]: T[K] extends Function ? K : never;
}[Extract<keyof T, string>];

type APIPath<N, T> = `${N & string}.${FunctionPropertyNames<T>}`;
type APIPaths<T> = { [N in keyof T]: APIPath<N, T[N]> }[keyof T];

export const constructAPI = (app: Container) => {
  const queryBus = app.get<QueryBus>(TYPES.QueryBus);
  const commandBus = app.get<CommandBus>(TYPES.CommandBus);

  const api = {
    contest: contestHandlers(queryBus, commandBus),
  };

  const generatePaths = <T extends Record<string, any>>(api: T): APIPaths<T>[] => {
    return Object.keys(api).flatMap((namespace) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const value = api[namespace];
      if (typeof value === 'object') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return Object.keys(value).map((key) => `${namespace}.${key}` as APIPaths<T>);
      } else {
        return [];
      }
    });
  };

  const paths = generatePaths(api);

  const invoke = <T extends typeof api, P extends APIPaths<T>>(path: P, data: any): any => {
    const [namespace, method] = path.split('.');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const handler = (api as any)[namespace]?.[method];

    if (typeof handler !== 'function') {
      throw new Error(`Invalid API path: ${path}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return handler(data);
  };

  return { api, invoke, paths };
};

export type APIPathUnion = ReturnType<typeof constructAPI>['paths'][number];
export type API = ReturnType<typeof constructAPI>['api'];
