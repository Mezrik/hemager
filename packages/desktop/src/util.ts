import { app } from 'electron';
import path from 'path';

export const isDev = (): boolean => process.env.NODE_ENV === 'development';

export const getPreloadPath = (): string => {
  return path.join(app.getAppPath(), isDev() ? '.' : '..', '/dist/preload.cjs');
};
