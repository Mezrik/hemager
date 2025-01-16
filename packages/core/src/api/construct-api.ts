import { API, APIPaths } from '@hemager/api-types';
import { Container } from 'inversify';

import { CommandBus, QueryBus } from '@/common/interfaces';
import { TYPES } from '@/di-types';

import { contestHandlers } from './handlers/contest';

export const constructAPI = (app: Container) => {
  const queryBus = app.get<QueryBus>(TYPES.QueryBus);
  const commandBus = app.get<CommandBus>(TYPES.CommandBus);

  const api = {
    contest: contestHandlers(queryBus, commandBus),
  } satisfies API;

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

  const invoke = <T extends API, P extends APIPaths<T>>(path: P, data: any): any => {
    const [namespace, method] = path.split('.') as [keyof API, keyof API[keyof API]];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const handler = api[namespace]?.[method];

    if (typeof handler !== 'function') {
      throw new Error(`Invalid API path: ${path}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
    return handler(data);
  };

  return { api, invoke, paths };
};
