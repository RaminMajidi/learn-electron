// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import { ipcRenderer, nativeImage, clipboard, shell } from 'electron';

window.addEventListener("DOMContentLoaded", () => {

 const btnOpenElectron = <HTMLButtonElement>document.getElementById("btnOpenElectron");
 const btnOpenImage = <HTMLButtonElement>document.getElementById("btnOpenImage");
 const btnOpenFolder = <HTMLButtonElement>document.getElementById("btnOpenFolder");

 btnOpenElectron.addEventListener('click',function(){
  shell.openExternal('https://www.electronjs.org');
 });
 btnOpenImage.addEventListener('click',function(){
  shell.openPath('my-picture.jpg');
 });
 btnOpenFolder.addEventListener('click',function(){
  shell.showItemInFolder('E:\\exampel\\electron\\learn-electron\\my-picture.jpg');
 });
 
});
