// All of the Node.js APIs are available in the preload process.

import { ipcRenderer } from "electron";

// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  const btnShowModal = <HTMLButtonElement>document.getElementById("btnShowModal");
  const btnCloseModal = <HTMLButtonElement>document.getElementById("btnCloseModal");
  const btnAddItem = <HTMLButtonElement>document.getElementById("btnAddItem");
  const modal = <HTMLDivElement>document.getElementById("modal");
  const inputUrl = <HTMLInputElement>document.getElementById("inputUrl");


  btnShowModal.addEventListener("click", () => {
    modal.style.display = 'flex';
    inputUrl.focus();
  });

  btnCloseModal.addEventListener("click", () => {
    inputUrl.value = "";
    modal.style.display = 'none';
  });

  btnAddItem.addEventListener("click", () => {
    const url = inputUrl.value;
    if (url) {
      console.log(url);
      ipcRenderer.send("add-url-channel", url);
      toggleModalButtons();
    }
  });

  inputUrl.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
      btnAddItem.click();
    }
  });


  function toggleModalButtons() {
    if (btnAddItem.disabled === true) {
      btnAddItem.innerText = "Add Item";
      btnAddItem.disabled = false;
      btnAddItem.style.opacity = '1';
      btnCloseModal.style.display = "inline-block";
    } else {
      btnAddItem.innerText = "Adding...";
      btnAddItem.disabled = true;
      btnAddItem.style.opacity = '0.5';
      btnCloseModal.style.display = "none";
    }
  }



  ipcRenderer.on("add-url-result-channel", (e, message) => {
    toggleModalButtons();
    inputUrl.value = "";
    alert(message);
  });

});




