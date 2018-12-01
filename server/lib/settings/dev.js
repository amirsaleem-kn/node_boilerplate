const path = require('path');
module.exports = {
    logOptions: {
        writeToFile: true,
        filePath: `${path.join(__dirname, '../../etc/logs/' ,`${((new Date()).toDateString()).replace(/ /g,'_')}.txt`)}`
    }
}