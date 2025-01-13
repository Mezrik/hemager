const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
  createCompetition: (data: any) => electron.ipcRenderer.invoke('create-competition', data),
});
