import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";

type Test = string;

app.on("ready", () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (isDev()) {
    win.loadURL("http://localhost:8080");
  } else {
    win.loadFile(path.join(app.getAppPath(), "..", "ui", "dist", "index.html"));
  }
});
