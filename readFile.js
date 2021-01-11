const fs = require('fs');

module.exports = (path,encoding) => {
    fs.readFile(path, encoding, (err, data) => {
        if (err) console.log(err.message);
        else console.log(data);
    })
}