const path = require('path');
module.exports = {
    write_logs_to_file: true,
    logFilePath: `${path.join(__dirname, '../../etc/logs/' ,`${((new Date()).toDateString()).replace(/ /g,'_')}.txt`)}`
}