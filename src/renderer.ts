// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

const btnOpenResume = <HTMLButtonElement>document.getElementById("openResume");
const btnCloseResume = <HTMLButtonElement>document.getElementById("closeResume");

class resumeWindow {
  private win: Window | null = null;
  open() {
    this.win = window.open(
      "https://ramindev01.vercel.app/",
      "_blank",
      "width=600,height=800,alwaysOnTop=true"
    );
  }
  close() {
    if (this.win) {
      this.win.close();
    }
  }
}

const myResume = new resumeWindow();

btnOpenResume.addEventListener("click", () => myResume.open());

btnCloseResume.addEventListener("click", () => myResume.close());
