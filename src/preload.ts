// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import { ipcRenderer, nativeImage, clipboard } from 'electron';

window.addEventListener("DOMContentLoaded", () => {

  const toUpperBtn = document.getElementById('to-uppercase');
  const showClipboardTextBtn = document.getElementById('show-clipboard-text');
  if (toUpperBtn !== null) {
    toUpperBtn.addEventListener('click', function () {
      let clipboardText = clipboard.readText();
      clipboardText = clipboardText.toUpperCase();
      clipboard.writeText(clipboardText);
    });
  }

  if (showClipboardTextBtn !== null) {
    showClipboardTextBtn.addEventListener('click', function () {
      console.log(clipboard.readText());
    });
  }

});
