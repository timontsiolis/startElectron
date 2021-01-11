// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var filePath = "";

document.querySelector('#newWindow').addEventListener('click', () => {
    newWindow();
});

document.querySelector('#dialog').addEventListener('click', () => {
    window.ipcRenderer.send('dialog', 'select your file');
});

document.querySelector('#doSomething').addEventListener('click', () => {
    window.ipcRenderer.send('doSomething', 'do something');
});

if (window.isElectron) {
    window.ipcRenderer.send('ping', 'hello main');
    window.ipcRenderer.on('pong', (event, msg) => console.log(msg));
    window.ipcRenderer.on('filePath', (event, msg) => {
        filePath = msg[0];
        document.getElementById('filePath').innerText = filePath;
        document.getElementById('doSomething').hidden = false;
    });
}

function newWindow() {
    window.ipcRenderer.send('newWindow', 'creating new Window');
}
