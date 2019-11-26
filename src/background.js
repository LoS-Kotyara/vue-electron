"use strict";
import electron from "electron";
import { app, protocol, BrowserWindow } from "electron";
import {
  createProtocol,
  installVueDevtools
} from "vue-cli-plugin-electron-builder/lib";
const isDevelopment = process.env.NODE_ENV !== "production";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let allScreens; // Размер всех экранов

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

// Получение минимального размера экранов
const getSize = () => {
  return {
    minWidth: allScreens.reduce(
      (min, p) => (p.size.width < min ? p.size.width : min),
      allScreens[0].size.width
    ),
    maxWidth: allScreens.reduce(
      (max, p) => (p.size.width > max ? p.size.width : max),
      allScreens[0].size.width
    ),
    minHeight: allScreens.reduce(
      (min, p) => (p.size.height < min ? p.size.height : min),
      allScreens[0].size.height
    ),
    maxHeight: allScreens.reduce(
      (max, p) => (p.size.height > max ? p.size.height : max),
      allScreens[0].size.height
    )
  };
};

// Получение необходимого минимального размера окна для всех экранов
const getMinSize = () => {
  let { minWidth, minHeight, maxWidth, maxHeight } = getSize();
  return {
    // (... / 10) * 10 -- округление до 10
    width: Math.floor(((minWidth + maxWidth) * 0.382 * 0.618) / 10) * 10,
    height: Math.floor(((minHeight + maxHeight) * 0.382 * 0.618) / 10) * 10
  };
};
function createWindow(MinHeight, MinWidth) {
  // Create the browser window.
  win = new BrowserWindow({
    width: MinWidth,
    height: MinHeight,

    // --
    // минимальная ширина окна
    // минимальная высота окна
    minWidth: MinWidth,
    minHeight: MinHeight,
    // --

    webPreferences: {
      nodeIntegration: true
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

  win.on("closed", () => {
    win = null;
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
  }

  // Получение размеров экранов
  allScreens = electron.screen.getAllDisplays();

  // Получение необходимого минимального размера окна
  let temp = getMinSize();
  let minHeight = temp.height;
  let minWidth = temp.width;

  // Создание окна с заданными параметрами
  createWindow(minHeight, minWidth);
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
