import { API, APIError, APIPathUnion } from '@hemager/api-types';
import electron from 'electron';
import { Task } from 'true-myth';

electron.contextBridge.exposeInMainWorld('electron', {
  contest: {
    create: (payload) => ipcInvoke('contest.create', payload),
    getOne: (id) => ipcInvoke('contest.getOne', id),
    getAll: () => ipcInvoke('contest.getAll'),
    update: (payload) => {
      return ipcInvoke('contest.update', payload);
    },
    getAllCategories: () => ipcInvoke('contest.getAllCategories'),
    getAllWeapons: () => ipcInvoke('contest.getAllWeapons'),

    initGroups: (payload) => ipcInvoke('contest.initGroups', payload),
    getAllParticipants: (id) => ipcInvoke('contest.getAllParticipants', id),
    assignParticipants: (payload) => ipcInvoke('contest.assignParticipants', payload),

    getResults: (contestId) => ipcInvoke('contest.getResults', contestId),
  },
  contestant: {
    create: (payload) => ipcInvoke('contestant.create', payload),
    getOne: (id) => ipcInvoke('contestant.getOne', id),
    getAll: () => ipcInvoke('contestant.getAll'),
    update: (payload) => ipcInvoke('contestant.update', payload),
  },
  group: {
    getOne: (id) => ipcInvoke('group.getOne', id),
    getAll: (contestId) => ipcInvoke('group.getAll', contestId),
  },
  match: {
    getOne: (id) => ipcInvoke('match.getOne', id),
    getAll: (groupId) => ipcInvoke('match.getAll', groupId),
    update: (payload) => ipcInvoke('match.update', payload),
  },
  club: {
    getOne: (id) => ipcInvoke('club.getOne', id),
    getAll: () => ipcInvoke('club.getAll'),
    create: (payload) => ipcInvoke('club.create', payload),
    update: (payload) => ipcInvoke('club.update', payload),
  },
} satisfies API);

function ipcInvoke<Key extends APIPathUnion>(key: Key, payload?: any): Task<any, APIError> {
  return electron.ipcRenderer.invoke(key, payload) as unknown as Task<any, APIError>;
}

function ipcOn<Key extends APIPathUnion>(key: Key, callback: (payload: any) => void) {
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}

function ipcSend<Key extends APIPathUnion>(key: Key, payload: any) {
  electron.ipcRenderer.send(key, payload);
}
