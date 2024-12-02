// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import { webFrame } from "electron";
import { ipcRenderer } from "electron"


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

  // const btnZoomUp = <HTMLButtonElement>document.getElementById("btnZoomUp");
  // const btnZoomDown = <HTMLButtonElement>document.getElementById("btnZoomDown");
  // const btnZoomReset = <HTMLButtonElement>document.getElementById("btnZoomReset");

  // btnZoomUp.addEventListener("click", () => {
  //   const zoomNumber = Math.round(webFrame.getZoomFactor()) >= 4 ? 4 : Math.round(webFrame.getZoomFactor()) + 1;
  //   webFrame.setZoomFactor(zoomNumber);
  // });

  // btnZoomDown.addEventListener("click", () => {
  //   const zoomNumber = Math.round(webFrame.getZoomFactor()) <= 1 ? 1 : Math.round(webFrame.getZoomFactor()) - 1;
  //   webFrame.setZoomFactor(zoomNumber);
  // });

  // btnZoomReset.addEventListener("click", () => {
  //   webFrame.setZoomFactor(1);
  // });


  const btnSendData = <HTMLButtonElement>document.getElementById('btnSendData');
  btnSendData.addEventListener('click', () => {
    ipcRenderer.send('test-channel-1', 'Hello World !');
  });

  // با این متد با هربار رویداد دستورات اجرا میشوند
  ipcRenderer.on('test-channel1-res', function (e, args) {
    console.log('test-channel1-res : ', args);
  });

  // با این متد دستورات فقط یک بار اجرا میشوند
  ipcRenderer.once('test-channel1-res', function (e, args) {
    console.log('test-channel1-res : ', args);
  });

});


// ipcRenderer.on('screenshot-channel', (e, result) => {
//   const imgScreen = <HTMLImageElement>document.getElementById('screenShotImage');
//   imgScreen.setAttribute('src',result);
// });

