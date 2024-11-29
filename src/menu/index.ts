import { Menu, MenuItem } from "electron";

// const mainMenu: Menu = new Menu();
// const mainMenuItem = new MenuItem({
//   label: "Home",
//   submenu: [{ label: "item1" }, { label: "item2" }, { label: "item3" }],
// });
// mainMenu.append(mainMenuItem);

const mainMenu = Menu.buildFromTemplate([
  {
    label: "Home",
    submenu: [
      { label: "item1", enabled: false },
      {
        label: "item2",
        click: () => {
          console.log("Item 2 from home is click");
        },
      },
      {
        label: "item3",
        accelerator: "shift + f",
        click: () => {
          console.log("Item 3 from home is click");
        },
      },
      {
        label: "item4",
        role: "togglefullscreen",
      },
    ],
  },
  {
    label: "about",
    submenu: [{ label: "item1" }, { label: "item2" }, { label: "item3" }],
  },
  {
    label: "Edit",
    submenu: [{ label: "item1" }, { label: "item2" }, { label: "item3" }],
  },
]);

export default mainMenu;
