const Logger = require('./Logger');
const app_settings = require('../settings');
module.exports = new Logger({
    filePath: app_settings.logOptions.filePath,
    writeToFile: app_settings.logOptions.writeToFile
});