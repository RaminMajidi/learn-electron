import {
  app,
  BrowserWindow,
  ipcMain,
  screen
} from "electron";
import mainMenu from "./components/menu";
import * as path from "path";
import createAppTray from "./utils/createAppTray";


export let mainWindow: BrowserWindow;

function createWindow() {

  // console.log(screen.getAllDisplays());
  const primaryDisplay = screen.getPrimaryDisplay();


  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: primaryDisplay.size.height,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    width: primaryDisplay.size.width / 2,
    title: "first page",
    x: primaryDisplay.bounds.x,
    y: primaryDisplay.bounds.y,
    backgroundColor: "#fcba03",
    show: false,
    alwaysOnTop: true
  });

  createAppTray();

  // and load the index.html of the app.
  mainWindow.loadFile("../index.html");
  mainWindow.setMenu(mainMenu);

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });


  // Open the DevTools.
  mainWindow.webContents.openDevTools();
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

ipcMain.on('get-cursor-positaion-channel', function (e, args) {
  const cursorPosition = screen.getCursorScreenPoint();
  console.log(cursorPosition);
  e.sender.send('res-cursor-positaion-channel', cursorPosition);
})