import { app, Menu, Tray } from "electron";
import { join } from "path";
import { mainWindow } from "../main";

const trayMenu = Menu.buildFromTemplate([
  { label: "item1" },
  { label: "item2" },
  { label: "item3" },
]);

function createAppTray() {
  const imagePath = join("assets", "icon.png");
  const appTry = new Tray(imagePath);
  appTry.setToolTip("My Application");
  appTry.setContextMenu(trayMenu);
  appTry.on("click", (e) => {
    if (e.shiftKey) {
      app.quit();
    } else {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    }
  });
}

export default createAppTray;
