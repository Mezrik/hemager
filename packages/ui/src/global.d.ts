import { API } from '@hemager/core';

declare global {
  interface Window {
    electron: API;
  }
}
