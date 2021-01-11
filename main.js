// Modules to control application life and create native browser window
const { app,
  BrowserWindow,
  ipcMain
} = require('electron');
const path = require('path');
const ipcController = require('./ipcController');

function createWindow(view) {
  // Create the browser window.
  const window = new BrowserWindow({
    width: 300,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the view-file of the app.
  if (view != null) window.loadFile(view);
  else window.loadFile('404.html');

  return window;

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  mainWindow = createWindow('index.html');

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

ipcMain.on('ping', (event, msg) => ipcController.ping(event, msg));

ipcMain.on('newWindow', () => createWindow());

ipcMain.on('dialog', (event, msg) => ipcController.dialogShowOne(event, msg));

ipcMain.on('doSomething', (event, msg) => console.log('todo: ' + msg));

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})



