// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import { ipcRenderer } from "electron";


class Items {
  private itemsList = <HTMLDivElement>document.getElementById("items");
  addItem(item: { title: string, screenshot: string, url: string }) {
      const newItem = document.createElement("div");
      const img = document.createElement('img');
      const h2 = document.createElement("h2");
      newItem.setAttribute("class", "readItem");
      img.setAttribute("src", item.screenshot);
      h2.textContent = item.title;
      newItem.appendChild(img);
      newItem.appendChild(h2);
      this.itemsList.appendChild(newItem);
  }
}



function isValidURL(url: string) {
  const regex = /^(https?:\/\/)?((([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\.)+[a-zA-Z]{2,}|localhost|\d{1,3}(\.\d{1,3}){3})(:\d+)?(\/[-a-zA-Z\d%_.~+]*)*(\?[;&a-zA-Z\d%_.~+=-]*)?(#[\-a-zA-Z\d_]*)?$/i;
  return regex.test(url);
}


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
    const validation = isValidURL(url);
    if (!validation) {
      console.log("Url is invalid !");
    } else {
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
      inputUrl.readOnly = false;
    } else {
      btnAddItem.innerText = "Adding...";
      btnAddItem.style.cursor = "progress";
      btnAddItem.disabled = true;
      btnAddItem.style.opacity = '0.5';
      btnCloseModal.style.display = "none";
      inputUrl.readOnly = true;
    }
  }



  ipcRenderer.on("add-url-result-channel", (e, item) => {
    console.log(item);
    const itemList = new Items();
    itemList.addItem(item);
    inputUrl.value = "";
    toggleModalButtons();
    console.log("New Item Added");
  });

});