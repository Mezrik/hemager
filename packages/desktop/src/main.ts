import { app, BrowserWindow, ipcMain } from 'electron';
import { init, createCompetitionHandler } from '@hemager/core';
import path from 'path';
import { getPreloadPath, isDev } from './util.js';

type Test = string;

app.on('ready', async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  win.loadURL('http://localhost:8080');
  // if (isDev()) {
  //   win.loadURL('http://localhost:8080');
  // } else {
  //   win.loadFile(path.join(app.getAppPath(), '..', 'ui', 'dist', 'index.html'));
  // }

  const application = await init();

  ipcMain.handle('create-competition', (event) => {
    return createCompetitionHandler(application);
  });
});
