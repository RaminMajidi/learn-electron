// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import { ipcRenderer, nativeImage, clipboard, shell } from 'electron';

window.addEventListener("DOMContentLoaded", () => {

  const btnShowNotification = <HTMLButtonElement>document.getElementById("btnShowNotification");

  btnShowNotification?.addEventListener('click', function () {
    const notification = new Notification('My Notification', {
      body: 'This is My Body Notification',
    });
    notification.onclick = (e)=>{
      console.log("notifaction clicked");
    };

    notification.onclose = (e)=>{
      console.log('notification closed');
    }
  
  
  });
});
