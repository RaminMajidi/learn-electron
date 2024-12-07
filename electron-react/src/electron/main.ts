import { app, BrowserWindow, ipcMain, Tray } from 'electron';
import path from 'path';
import { ipcMainHandle, isDev } from './util.js';
import { getStaticData, pollResource } from './resourceManeger.js';
import { getAssetPath, getPreloadPath, getUIPath } from './pathResolver.js';
import { createTray } from './Tray.js';


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

  createTray(mainWindow);


  handelCloseEvents(mainWindow);


});


function handelCloseEvents(mainWindow: BrowserWindow) {
  let willClose = false;

  if (willClose) return;


  mainWindow.on("close", (e) => {
    e.preventDefault();
    mainWindow.hide();
    // check dock for mac os
    if (app.dock) {
      app.dock.hide();
    }
  });

  app.on("before-quit", () => {
    willClose = true;
  });

  mainWindow.on('show', () => {
    willClose = false;
  })

}