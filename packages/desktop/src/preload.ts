import { APIPathUnion, API } from '@hemager/core';
import electron from 'electron';

electron.contextBridge.exposeInMainWorld('electron', {
  competition: {
    create: (payload) => ipcInvoke('competition.create', payload),
    get: (id) => ipcInvoke('competition.get', id),
  },
} satisfies API);

function ipcInvoke<Key extends APIPathUnion>(key: Key, payload: any): Promise<any> {
  return electron.ipcRenderer.invoke(key, payload);
}

function ipcOn<Key extends APIPathUnion>(key: Key, callback: (payload: any) => void) {
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}

function ipcSend<Key extends APIPathUnion>(key: Key, payload: any) {
  electron.ipcRenderer.send(key, payload);
}
