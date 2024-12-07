import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { ipcMainHandle, isDev } from './util.js';
import { getStaticData, pollResource } from './resourceManeger.js';
import { getPreloadPath, getUIPath } from './pathResolver.js';


app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });
  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123');
  } else {
    mainWindow.loadFile(getUIPath());
  }

  pollResource(mainWindow);
  mainWindow.webContents.openDevTools();

  ipcMainHandle("getStaticData", () => {
    return getStaticData();
  });

});