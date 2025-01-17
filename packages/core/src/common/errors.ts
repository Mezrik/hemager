import { APIError } from '@hemager/api-types';

export interface InternalError {
  cause: string;
}

export enum CommandErrorTypes {
  NOT_FOUND,
  CAUGHT_EXCEPTION,
  COMMAND_NOT_BOUND,
}

export interface CommandError extends InternalError {
  type: CommandErrorTypes;
}

export enum QueryErrorTypes {
  NOT_FOUND,
  CAUGHT_EXCEPTION,
  QUERY_NOT_BOUND,
}

export interface QueryError extends InternalError {
  type: QueryErrorTypes;
}

export function commandErrorToAPIError(error: CommandError): APIError {
  switch (error.type) {
    case CommandErrorTypes.NOT_FOUND:
      return {
        cause: error.cause,
        code: 404,
      };
    default:
      return {
        cause: error.cause,
        code: 500,
      };
  }
}

export function queryErrorToAPIError(error: QueryError): APIError {
  switch (error.type) {
    case QueryErrorTypes.NOT_FOUND:
      return {
        cause: error.cause,
        code: 404,
      };
    default:
      return {
        cause: error.cause,
        code: 500,
      };
  }
}

export function ensureThrownError(value: unknown): Error {
  if (value instanceof Error) return value;

  let stringified = '[Unable to stringify the thrown value]';
  try {
    stringified = JSON.stringify(value);
  } catch {
    /* empty */
  }

  const error = new Error(`This value was thrown as is, not through an Error: ${stringified}`);
  return error;
}
