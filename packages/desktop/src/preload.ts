import electron from 'electron';

electron.contextBridge.exposeInMainWorld('electron', {
  createCompetition: (data: any) => electron.ipcRenderer.send('create-competition', data),
});
