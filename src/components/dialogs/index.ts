import { app, dialog } from "electron";
import { mainWindow } from "../../main";

export function showDialog() {
  dialog
    .showOpenDialog(mainWindow, {
      title: "select New Item",
      buttonLabel: "Selaetc Item",
      defaultPath: app.getPath("desktop"),
      properties: ["createDirectory", "promptToCreate"],
    })
    .then((res) => {
      console.log(res.filePaths);
    });
}

export function messageBox() {
  dialog
    .showMessageBox(mainWindow, {
      title: "Message Box Title",
      message: "This Is message of Message Box",
      detail: "This Is Details of Message Box",
      buttons: ["Yes", "No", "Cancel"],
    })
    .then((res) => {
      console.log(res);
    });
}
