import { app, BrowserWindow, ipcMain } from 'electron';
import { initialize, constructAPI } from '@hemager/core';
import { getPreloadPath, isDev } from './util.js';

app.on('ready', async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  const application = await initialize();
  const { invoke, paths } = constructAPI(application);

  win.loadURL('http://localhost:8080');

  // if (isDev()) {
  //   win.loadURL('http://localhost:8080');
  // } else {
  //   win.loadFile(path.join(app.getAppPath(), '..', 'ui', 'dist', 'index.html'));
  // }

  paths.forEach((event) => {
    ipcMain.on(event, (e, data) => invoke(event, data));
  });
});
