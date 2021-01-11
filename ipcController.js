const { dialog } = require('electron');

exports.ping = (event, msg) => {
    console.log(msg) // msg from web page
    mainWindow.webContents.send('pong', 'hi web page') // send to web page
}

exports.dialogShowOne = (event, msg) => {
    const options = {
        title: msg,
        //defaultPath: '/path/to/something/',
        buttonLabel: 'Do it',
        filters: [
            { name: '.csv', extensions: ['html'] }
        ],
        //properties: ['showHiddenFiles'],
        //message: 'This message will only be shown on macOS'
    };
    dialog.showOpenDialog(options)
        .then(result => {
            if (!result.canceled) mainWindow.webContents.send('filePath', result.filePaths);
        }).catch(err => {
            console.log(err)
        })
}