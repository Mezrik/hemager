import { Container } from 'inversify';
import { competitionHandlers } from './handlers/competition';
import { TYPES } from '@/di-types';
import { CommandBus, QueryBus } from '@/common/interfaces';
import { CompetitionTypeEnum, GenderEnum } from '@/domain/competition/competition';

export * from './dto/competition';

type FunctionPropertyNames<T> = {
  [K in Extract<keyof T, string>]: T[K] extends Function ? K : never;
}[Extract<keyof T, string>];

type APIPath<N, T> = `${N & string}.${FunctionPropertyNames<T>}`;
type APIPaths<T> = { [N in keyof T]: APIPath<N, T[N]> }[keyof T];

export const constructAPI = (app: Container) => {
  const queryBus = app.get<QueryBus>(TYPES.QueryBus);
  const commandBus = app.get<CommandBus>(TYPES.CommandBus);

  const api = {
    competition: competitionHandlers(queryBus, commandBus),
  };

  const generatePaths = <T extends Record<string, any>>(api: T): APIPaths<T>[] => {
    return Object.keys(api).flatMap((namespace) => {
      const value = api[namespace];
      if (typeof value === 'object') {
        return Object.keys(value).map((key) => `${namespace}.${key}` as APIPaths<T>);
      } else {
        return [];
      }
    });
  };

  const paths = generatePaths(api);

  const invoke = <T extends typeof api, P extends APIPaths<T>>(path: P, data: any): any => {
    const [namespace, method] = path.split('.');
    const handler = (api as any)[namespace]?.[method];

    if (typeof handler !== 'function') {
      throw new Error(`Invalid API path: ${path}`);
    }

    return handler(data);
  };

  return { api, invoke, paths };
};

export type APIPathUnion = ReturnType<typeof constructAPI>['paths'][number];
