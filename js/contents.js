console.log(document.getElementsByClassName("contain"));

require('electron').ipcRenderer.on('asynchronous-reply-to-contents', (event, arg) => {
    console.log("contents.js", event, arg);
    console.log(document.getElementsByClassName('contain'));
    console.log(require('electron').ipcRenderer.sendSync('synchronous-message', 'send from contents.js by sync'), "sync message received in contents.js");
    require('electron').ipcRenderer.send('asynchronous-message', documet.getElementsByClassName('contain'));
})


function getHTML()
{
    return document.getElementsByClassName("contain");
}
