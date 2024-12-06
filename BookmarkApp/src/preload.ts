// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import { ipcRenderer } from "electron";

// start ***
class Items {
  private itemsList = <HTMLDivElement>document.getElementById("items");
  addItem(item: { title: string, screenshot: string, url: string }) {
    const newItem = document.createElement("div");
    const img = document.createElement('img');
    const h2 = document.createElement("h2");
    newItem.setAttribute("class", "readItem");
    newItem.setAttribute("data-url", item.url);
    newItem.addEventListener("click", selectedItem);
    newItem.addEventListener("dblclick", openBookmarkUrl);
    newItem.addEventListener("contextmenu", deleteBookmarkUrl);
    img.setAttribute("src", item.screenshot);
    h2.textContent = item.title;
    newItem.appendChild(img);
    newItem.appendChild(h2);
    this.itemsList.appendChild(newItem);
  }

  changeSelectedItem(dir: string) {
    const selected = document.getElementsByClassName("readItem selected")[0];
    if (selected) {
      if (dir === "ArrowDown") {
        const nextItem = selected.nextElementSibling;
        if (nextItem) {
          selected.classList.remove("selected");
          nextItem.classList.add("selected");
        }

      } else if (dir === "ArrowUp") {
        const previousItem = selected.previousElementSibling;
        if (previousItem) {
          selected.classList.remove("selected");
          previousItem.classList.add("selected");
        }
      }
    }
  }
}
// end ***


// start ***
function selectedItem() {
  const selected = document.getElementsByClassName('readItem selected')[0];

  if (selected) {
    selected.classList.remove('selected');
  }
  this.classList.add('selected');
}
// end ***


// start ***
function isValidURL(url: string) {
  const regex = /^(https?:\/\/)?((([a-zA-Z\d]([a-zA-Z\d-]*[a-zA-Z\d])*)\.)+[a-zA-Z]{2,}|localhost|\d{1,3}(\.\d{1,3}){3})(:\d+)?(\/[-a-zA-Z\d%_.~+]*)*(\?[;&a-zA-Z\d%_.~+=-]*)?(#[\-a-zA-Z\d_]*)?$/i;
  return regex.test(url);
}
// end ***


// start ***
function openBookmarkUrl() {
  const selected = document.getElementsByClassName('readItem selected')[0];
  if (selected) {
    const urlContetnt = selected.getAttribute('data-url');
    const urlWindow = window.open(urlContetnt, "", `
    maxWidth:2000,
    maxHeight:2000,
    width:1200,
    height:800,
    backgroundColor:#dedede,
    nodeIntegration:0,
    contextIsolation:1
    `);
  }
}
// end ***

// start ***
function deleteBookmarkUrl() {
  const selected = document.getElementsByClassName("readItem selected")[0];

  if (selected) {
    const itemList = document.getElementById('items');
    if (itemList) {
      itemList.removeChild(selected);
      const firstItem = document.getElementsByClassName('readItem')[0];
      firstItem?.classList.add('selected');
    }
  }
}
// end ***


window.addEventListener("DOMContentLoaded", () => {
  // *** start Select Elements Item ***
  const btnShowModal = <HTMLButtonElement>document.getElementById("btnShowModal");
  const btnCloseModal = <HTMLButtonElement>document.getElementById("btnCloseModal");
  const btnAddItem = <HTMLButtonElement>document.getElementById("btnAddItem");
  const modal = <HTMLDivElement>document.getElementById("modal");
  const inputUrl = <HTMLInputElement>document.getElementById("inputUrl");
  const lblMessage = <HTMLLabelElement>document.getElementById("lblMessage");
  const inputSearch = <HTMLInputElement>document.getElementById("inputSearch");
  const itemList = new Items();
  // *** end Select Elements Item ***

  // *** start event btn Show Moadl ***
  btnShowModal.addEventListener("click", () => {
    modal.style.display = 'flex';
    inputUrl.focus();
  });
  // *** end event btn Show Moadl ***


  // *** start event btn Close Modal ***
  btnCloseModal.addEventListener("click", () => {
    inputUrl.value = "";
    lblMessage.innerText = "";
    modal.style.display = 'none';
  });
  // *** end event btn Close Modal ***


  // *** start event btn Add Item ***
  btnAddItem.addEventListener("click", () => {
    lblMessage.innerText = "";
    const url = inputUrl.value;
    const validation = isValidURL(url);
    if (!validation) {
      console.log("Url is invalid !");
    } else {
      ipcRenderer.send("add-url-channel", url);
      toggleModalButtons();
    }
  });
  // *** end event btn Add Item ***


  // *** start event write url ***
  inputUrl.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
      btnAddItem.click();
    }
  });
  // *** end event write url ***


  // *** start toggle Modal ***
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
  // *** end toggle Modal ***


  // *** start add new item channel ***
  ipcRenderer.on("add-url-result-channel", (e, item) => {
    console.log(item);

    if (item.title === "Failed to load") {
      console.log("Failed to load");
      lblMessage.style.color = "red";
      lblMessage.innerText = "Failed to load url !";
      toggleModalButtons();
    } else {
      itemList.addItem(item);
      inputUrl.value = "";
      toggleModalButtons();
      console.log("New Item Added");
      lblMessage.style.color = "green";
      lblMessage.innerText = "New Item Added!";
    }

  });
  // *** end add new item channel ***


  // *** start search event ***
  inputSearch.addEventListener("keyup", (e) => {
    const itemList = document.getElementsByClassName("readItem");
    Array.from(itemList).forEach((item) => {
      const hasMatch = (<HTMLDivElement>item).innerText.toLowerCase()
        .includes(inputSearch.value);
      (<HTMLDivElement>item).style.display = hasMatch ? "flex" : "none";
    });
  });
  // *** end search event ***

  // *** start kedown even ***
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      itemList.changeSelectedItem(e.key);
    }
  })
  // *** end kedown even ***

});