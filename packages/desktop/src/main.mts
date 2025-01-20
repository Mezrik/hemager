import { app, BrowserWindow, ipcMain, session } from 'electron';
import { initialize, constructAPI } from '@hemager/core';
import path from 'path';
import os from 'os';

import { getPreloadPath, isDev } from './util.js';

const reactDevToolsPath = path.join(
  os.homedir(),
  '/Library/Application\ Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/6.0.1_0',
);

app.on('ready', async () => {
  console.log(reactDevToolsPath);
  await session.defaultSession.loadExtension(reactDevToolsPath);

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: getPreloadPath(),
      nodeIntegration: true,
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
    ipcMain.handle(event, (e, data) => {
      console.log('main', event, data);
      return invoke(event, data);
    });
  });
});
