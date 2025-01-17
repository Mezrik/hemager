/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Result, Task } from 'true-myth';

type Repr<T, E> = [tag: 'Ok', value: T] | [tag: 'Err', error: E];

export const unwrapTask = async <T, E>(task: Task<T, E>): Promise<Result<T, E>> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const [tag, value]: Repr<T, E> = (await (task as any)).repr;

  if (tag === 'Ok') {
    return Result.ok(value);
  } else {
    return Result.err(value);
  }
};
