"use strict";

const {app, Menu, BrowserWindow} = require('electron');

let mainWindow = null;

function createWindow(){
    mainWindow = new BrowserWindow({width: 800, height: 800});
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
