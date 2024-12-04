import { app, BrowserWindow } from "electron";
import * as path from "path";
import { Database } from "sqlite3";


const db = new Database(path.join('E:\\exampel\\electron\\learn-electron\\src\\data', 'database.db'));

db.serialize(() => {
  // db.run('CREATE TABLE Users(firstName,lastName)');

  // db.run('INSERT INTO Users VALUES(?,?)', ['ramin', 'majidi']);
  // db.run('INSERT INTO Users VALUES(?,?)', ['daneal', 'halalan']);
  // db.run('INSERT INTO Users VALUES(?,?)', ['ali', 'tehrani']);

  db.each('SELECT * FROM Users', (err, row) => {
    console.log(row);
  })
});
db.close();


function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    width: 800,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../index.html"));

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
