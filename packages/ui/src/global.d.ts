import { API } from '@hemager/api';

declare global {
  interface Window {
    electron: API;
  }
}
