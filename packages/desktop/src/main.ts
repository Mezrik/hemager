import { app, BrowserWindow, ipcMain } from 'electron';
import { init } from 'core';
import path from 'path';
import { isDev } from './util.js';

type Test = string;

app.on('ready', async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL('http://localhost:8080');
  // if (isDev()) {
  //   win.loadURL('http://localhost:8080');
  // } else {
  //   win.loadFile(path.join(app.getAppPath(), '..', 'ui', 'dist', 'index.html'));
  // }

  const application = await init();

  ipcMain.handle('create-competition', (event) => {});
});
