const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
const webContents = electron.webContents;
const fs = require('fs');

function previewHTML(html) {
    var win = new BrowserWindow({});
    console.log(html);
    //TODO: remove script, #editor, #btn
    fs.writeFile('preview.html', "<html>" + html + "</html>", (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
        else {
            console.log(err, "save ../preview.html", html);
        }
    });

    win.loadURL('file://' + __dirname + '/preview.html');

    var contents = win.webContents;
    contents.openDevTools();

    contents.printToPDF({}, (error, data) => {
        fs.writeFile("test.pdf", data, (error) => {
            console.log("DONE");
        });
    });;


}
