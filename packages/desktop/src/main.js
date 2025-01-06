import { app, BrowserWindow } from "electron";
import path from "path";

app.on("ready", () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile(path.join(app.getAppPath(), "..", "ui", "dist", "index.html"));
});
