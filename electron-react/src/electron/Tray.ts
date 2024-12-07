import { app, BrowserWindow, Menu, Tray } from "electron";
import path from "path"
import { getAssetPath } from "./pathResolver.js";

export function createTray(mainWindow: BrowserWindow) {
    const tray = new Tray(
        path.join(
            getAssetPath(),
            process.platform === "darwin" ? 'trayIconTemplate.png' : 'trayIcon.png')
    );

    tray.setContextMenu(Menu.buildFromTemplate([{
        label:"Qiut",
        click:()=> app.quit()
    }]))
}