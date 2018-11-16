"use strict";

const { app, BrowserWindow } = require('electron');

let mainWindow = null;

const templateMenu = [
    {
        label: 'File',
        submenu: [
            {
                role: 'open',
                label: 'Open',
            },
            {
                role: 'save',
                label: 'Save',
            },
            {
                role: 'export',
                label: 'Export to PDF',
                click() {
                    console.log("export.");
                    mainWindow.loadURL('file://' + __dirname + '/preview.html')
                }
            },
            {
                role: 'quit'
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {
                role: 'undo',
            },
            {
                role: 'redo',
            },
            {
                role: 'cut',
            },
            {
                role: 'copy',
            },
            {
                role: 'paste',
            },
        ]
    },
]

function createWindow() {
    mainWindow = new BrowserWindow({ width: 1200, height: 800 });
    mainWindow.loadURL('file://' + __dirname + '/editor.html');
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
