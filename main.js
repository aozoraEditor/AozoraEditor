"use strict";

const { app, Menu, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
let mainWindow = null;
let printWindow = null;

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

ipcMain.on('start_pdf', (event, arg) => {
    console.log(arg);
    printWindow = new BrowserWindow({ width: 1200, height: 800 });
    printWindow.loadURL('file://' + __dirname + '/preview.html');
    //printWindow.loadURL('http://github.com');
    printWindow.webContents.openDevTools();
    printWindow.webContents.on('did-finish-load', () => {
        printWindow.webContents.printToPDF({
            pageSize: "A4",
            landscape: true,
        }, (error, data) => {
            if (error) throw error;
            console.log(data);
            fs.writeFile('test.pdf', data, (error) => {
                if (error) throw error;
                console.log("Write PDF");
                printWindow.close();
            });
        });
    });
    event.returnValue = "END";
});

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
