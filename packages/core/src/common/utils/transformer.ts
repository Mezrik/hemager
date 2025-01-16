import { ClassTransformOptions, instanceToPlain as instanceToPlainBase } from 'class-transformer';

export function instanceToPlain<T>(object: T, options?: ClassTransformOptions): Record<string, any>;
export function instanceToPlain<T>(
  object: T[],
  options?: ClassTransformOptions,
): Record<string, any>[];

export function instanceToPlain<T>(
  object: T | T[],
  options?: ClassTransformOptions,
): Record<string, any> | Record<string, any>[] {
  return instanceToPlainBase(object, { ...(options ?? {}), excludePrefixes: ['_'] });
}
