// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import { ipcRenderer, nativeImage, clipboard, shell } from 'electron';

window.addEventListener("DOMContentLoaded", () => {


  setNetworkStatus(navigator.onLine);
  window.addEventListener('online', function () {
    setNetworkStatus(this.navigator.onLine)
  });
  window.addEventListener('offline', function () {
    setNetworkStatus(this.navigator.onLine)
  });

  function setNetworkStatus(networkStatus: boolean) {
    const applicationStatus = <HTMLSpanElement>document.getElementById("applicationStatus");
    applicationStatus.innerText = networkStatus ? "OnLine" : "OffLine";
  }

});
