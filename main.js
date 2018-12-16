const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu

const path = require('path')
const url = require('url')

/* require('electron-reload')(__dirname) */

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const globalShortcut = electron.globalShortcut;
const ipcMain = electron.ipcMain;

const {IPC_READ_REQUEST, IPC_READ_RESPONSE, IPC_WRITE_REQUEST} = require('./actions/ipcActions');


const dialog = electron.dialog; 
const fs = require('fs');

function createWindow () {
  // Create the browser window.
    mainWindow = new BrowserWindow({
        minWidth: 1300, minHeight: 800, width: 1300, height: 800, webPreferences: {
            experimentalFeatures: true
        },
        title: "Notes"
    })

    var menu = Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {label:'Save', click() {
                    mainWindow.webContents.send(IPC_WRITE_REQUEST, {type: IPC_WRITE_REQUEST});
                }},
                {label:'Exit', click() {
                    app.quit();
                }}
            ]
        }
    ])
    Menu.setApplicationMenu(menu); 

    globalShortcut.register('f5', function() {
        app.relaunch();
        app.exit(0);
    })
    
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on(IPC_READ_REQUEST, (event, arg) => { 
    dialog.showOpenDialog(function (fileNames) { 
       
       // fileNames is an array that contains all the selected 
       if(fileNames === undefined) { 
          console.log("No file selected"); 
       
       } else { 
          readFile(fileNames[0]); 
       } 
    });
    
    function readFile(filepath) { 
       fs.readFile(filepath, 'utf-8', (err, data) => { 
          
          if(err){ 
             alert("An error ocurred reading the file :" + err.message) 
             return 
          } 
          
          const parsed = JSON.parse(data);
          event.sender.send(IPC_READ_RESPONSE, {measures: parsed.measures, timeSignature: parsed.timeSignature, type: IPC_READ_RESPONSE}) 
       })
    } 
});

ipcMain.on(IPC_WRITE_REQUEST, (e, d) => {
    if(d && d.measures) {
        dialog.showSaveDialog(mainWindow, (f) => {
            fs.writeFile(f, JSON.stringify({timeSignature: d.timeSignature, measures: d.measures}), () => {
                console.log("State saved");
            });
        })
    }
});

