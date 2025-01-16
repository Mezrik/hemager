import { API } from '@hemager/api-types';

declare global {
  interface Window {
    electron: API;
  }
}
