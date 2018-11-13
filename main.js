"use strict";

const {app, Menu, BrowserWindow} = require('electron');
let mainWindow = null;
require('electron').ipcMain.on('synchronous-message', (event, arg) => {
    console.log(arg, event) // prints "ping"
    event.returnValue = 'send from main.js by sync';
    event.sender.send('asynchronous-reply', 'send from main.js by async');
});

require('electron').ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.sender.send('asynchronous-reply-to-contents', require('electron').ipcMain.on('asynchronous-message', (event, arg) => {
        event.sender.send('asynchronous-reply-to-main', event);
    }));
});

function createWindow(){
    mainWindow = new BrowserWindow({width: 1200, height: 800});
    mainWindow.loadURL('file://' + __dirname + '/main.html');
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function(){
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if(mainWindow === null){
        createWindow();
    }
});
