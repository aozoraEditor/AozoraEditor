"use strict";

const { app, Menu, BrowserWindow } = require('electron');
let mainWindow = null;

const templateMenu = [
    {
        label: app.getName(),
        submenu: [
            { role: 'about' },
            { role: 'quit' }
        ]
    },
    {
        label: "Edit",
        submenu: [
            { role: "undo" },
            { role: "redo" },
            { type: "separator" },
            { role: "copy" },
            { role: "cut" },
            { role: "paste" },
            { type: "separator" },
            { role: "selectall" }
        ]
    }
];

function installMenu() {
    let templateMenu;
}

function createWindow() {
    var menu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(menu);
    mainWindow = new BrowserWindow({ width: 1200, height: 800 });
    mainWindow.loadURL('file://' + __dirname + '/editor.html');
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', () => {
    createWindow();
    installMenu();
});

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
