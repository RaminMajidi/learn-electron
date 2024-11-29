import {
  app,
  BrowserWindow,
  dialog,
  globalShortcut,
  Menu,
  MenuItem,
} from "electron";
import * as path from "path";

// const mainMenu: Menu = new Menu();
// const mainMenuItem = new MenuItem({
//   label: "Home",
//   submenu: [{ label: "item1" }, { label: "item2" }, { label: "item3" }],
// });
// mainMenu.append(mainMenuItem);

const mainMenu = Menu.buildFromTemplate([
  {
    label: "Home",
    submenu: [
      { label: "item1", enabled: false },
      {
        label: "item2",
        click: () => {
          console.log("Item 2 from home is click");
        },
      },
      {
        label: "item3",
        accelerator: "shift + f",
        click: () => {
          console.log("Item 3 from home is click");
        },
      },
      {
        label: "item4",
        role: "togglefullscreen",
      },
    ],
  },
  {
    label: "about",
    submenu: [{ label: "item1" }, { label: "item2" }, { label: "item3" }],
  },
  {
    label: "Edit",
    submenu: [{ label: "item1" }, { label: "item2" }, { label: "item3" }],
  },
]);

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    width: 800,
    title: "first page",
    backgroundColor: "#fcba03",
    show: false,
    resizable: false,
    // frame: false,
    // transparent: true,
    // opacity: 0.5,
    // alwaysOnTop: true,
  });

  // const child = new BrowserWindow({
  //   width: 250,
  //   height: 250,
  //   parent: mainWindow,
  //   modal: true,
  //   show: false,
  // });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));
  mainWindow.setMenu(mainMenu);
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
    // child.show();
  });

  globalShortcut.register("CommandOrControl + F", () => {
    console.log("User pressed : Control + F");
    globalShortcut.unregister("CommandOrControl + F");
  });

  mainWindow.webContents.on("did-finish-load", () => {
    // dialog
    //   .showOpenDialog(mainWindow, {
    //     title: "select New Item",
    //     buttonLabel: "Selaetc Item",
    //     defaultPath: app.getPath("desktop"),
    //     properties: ["createDirectory", "promptToCreate"],
    //   })
    //   .then((res) => {
    //     console.log(res.filePaths);
    //   });
    //   dialog.showMessageBox(mainWindow,{
    //     title:"Message Box Title",
    //     message:"This Is message of Message Box",
    //     detail:"This Is Details of Message Box",
    //     buttons:["Yes","No","Cancel"]
    //   }).then((res)=>{
    //     console.log(res);
    //   })
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
