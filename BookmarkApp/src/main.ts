import { app, BrowserWindow, ipcMain, session } from "electron";
import * as path from "path";
import windowStateKeeper from "electron-window-state";
import readItem from "./readItem";


let mainWindow: BrowserWindow;

function createWindow() {

  // clear cach
  // session.defaultSession.clearCache().then(() => {
  //   console.log("Cache cleared!");
  // });
  // ***


  // Create the browser window.

  const state = windowStateKeeper({
    defaultWidth: 500, defaultHeight: 650
  });


  const mainWindow = new BrowserWindow({
    x: state.x,
    y: state.y,
    height: state.width,
    width: state.height,
    minWidth: 350,
    maxWidth: 650,
    minHeight: 300,
    title: "Bookmark Url",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../index.html"));

  state.manage(mainWindow);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.


ipcMain.on('add-url-channel', (e, url) => {

  readItem(url, function (item: { title: string, screenshot: string, url: string }) {
    e.sender.send('add-url-result-channel', item);
  });

});