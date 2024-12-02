// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

import { ipcRenderer } from "electron";

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(
      `${type}-version`,
      process.versions[type as keyof NodeJS.ProcessVersions]!
    );
  }

  const mainBody = document.querySelector('body');
  if (mainBody) {
    mainBody.addEventListener('click', function () {
      ipcRenderer.send('get-cursor-positaion-channel', {});
    });
  }
});

ipcRenderer.on("res-cursor-positaion-channel", function (e, args: { x: string, y: string }) {
  const outX = <HTMLSpanElement>document.getElementById('cursor-x');
  const outY = <HTMLSpanElement>document.getElementById('cursor-y');
  outX.innerText = args.x;
  outY.innerText = args.y;
});