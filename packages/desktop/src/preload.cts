const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
  contest: {
    create: (payload) => ipcInvoke('contest.create', payload),
    getOne: (id) => ipcInvoke('contest.getOne', id),
    getAll: () => ipcInvoke('contest.getAll'),
    update: (id, payload) => ipcInvoke('contest.update', { id, payload }),
    getAllCategories: () => ipcInvoke('contest.getAllCategories'),
    getAllWeapons: () => ipcInvoke('contest.getAllWeapons'),
  },
});

function ipcInvoke<Key extends any>(key: Key, payload?: any): Promise<any> {
  return electron.ipcRenderer.invoke(key, payload);
}

function ipcOn<Key extends any>(key: Key, callback: (payload: any) => void) {
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}

function ipcSend<Key extends any>(key: Key, payload: any) {
  electron.ipcRenderer.send(key, payload);
}
