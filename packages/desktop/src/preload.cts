import { API, APIPathUnion } from '@hemager/api-types';
import electron from 'electron';

electron.contextBridge.exposeInMainWorld('electron', {
  contest: {
    create: (payload) => ipcInvoke('contest.create', payload),
    getOne: (id) => ipcInvoke('contest.getOne', id),
    getAll: () => ipcInvoke('contest.getAll'),
    update: (payload) => ipcInvoke('contest.update', payload),
    getAllCategories: () => ipcInvoke('contest.getAllCategories'),
    getAllWeapons: () => ipcInvoke('contest.getAllWeapons'),
  },
} satisfies API);

function ipcInvoke<Key extends APIPathUnion>(key: Key, payload?: any): Promise<any> {
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
