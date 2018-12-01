/**
 * @author Amir Saleem
 * @docs http://localhost:5000/documentation/v1/logger.html
 * @description Logger class used to print statements on terminal
 */

const chalk = require('chalk');
const fs = require('fs');
const node_env = process.env.NODE_ENV;
const path = require('path');
const util = require('util');
const defaultOptions = {
    filePath: `${path.join(__dirname, '../../etc/logs/' ,`${((new Date()).toDateString()).replace(/ /g,'_')}.txt`)}`,
    writeToFile: true
}

/**
 * @class Logger
 * @type private
 */

class Logger {

    constructor (options = defaultOptions, callingModule) {
        if(!options.filePath){
            options.filePath = defaultOptions.filePath;
        }
        this._options = options;
        this._callingModule = callingModule;
    }

    get options () {
        return this._options;
    }

    set options (options) {
        this._options = options;
    }

    set callingModule (callingModule) {
        this._callingModule = callingModule;
    }

    get callingModule () {
        return this._callingModule;
    }

    _getLabel () {
        let parts = this._callingModule.filename.split('/');
        return parts[parts.length - 2] + '/' + parts.pop();
    };

    _handlePrint () {
        if(this._callingModule) {
            console.log(this._getLabel(), ...arguments);
        } else {
            console.log(...arguments);
        }
        this._writeToFile(...arguments);
    }

    /**
     * @method log
     * @description this method prints the message on console in test environment only
     * @param {*} message 
     */

    log () {
        if(node_env != 'production'){
            this._handlePrint(...arguments);
        }
    }

    /**
     * @method warning
     * @description this method prints the warning message in test environment only, it adds a [warning] prefix with the message
     * @param {any} message 
     */

    warning () {
        const prefix = '[warning] ';
        if(node_env != 'production'){
            this._handlePrint(chalk.keyword('orange')(prefix, ...arguments));
            this._writeToFile(...arguments);
        }
    }

    /**
     * @method error
     * @description this method prints the error message, it adds an [error] prefix with the message
     * @param {any} message 
     */

    error (message) {
        const prefix = '[error] ';
        if(typeof message != 'object'){
            console.error(chalk.red(prefix, ...arguments));
            this._writeToFile(...arguments);
        } else {
            console.error(...arguments);
            this._writeToFile(...arguments);
        }
    }

    /**
     * @method trace
     * @description this method prints the complete stack trace of the  message
     * @param {any} message 
     */

    trace (message) {
        console.trace(message);
        this._writeToFile(...arguments);
    }

    /**
     * @method warning
     * @description this method calls the default console.log method
     * @param {any} message 
     */

    defaultLog () {
        console.log(...arguments);
        this._writeToFile(...arguments);
    }

    /**
     * @method logHttpRequest
     * @description http request logger middleware, use this  with app.use
     * @param {object} req http request object
     * @param {object} res http response object
     */

    logHttpRequest (req, res, next) {
        this.log(`[${req.method}]${req.originalUrl}`, 
        `[HEADERS]:${JSON.stringify(req.headers)}`, 
        `[QUERY]:${JSON.stringify(req.query)}`, 
        `[PARAMS]:${JSON.stringify(req.params)}`, 
        `[BODY]:${JSON.stringify(req.body)}`);
        next();
    }

    /**
     * @method highlight
     * @description method to print highlighted statement on console
     * @param {any} message
     */

    highlight () {
        if(node_env != 'production'){
            console.log(chalk.keyword('green')(...arguments));
            this._writeToFile(...arguments);
        }
    }

    /**
     * @method _writeToFile
     * @description method to write log output to file
     * @param {*} data 
     */

    _writeToFile (data) {
        if(typeof data == 'object'){
            try {
                data = JSON.stringify(data);
            } catch (e) {
                console.log(e);
                null;
            }
        }
        data = `[${(new Date().toLocaleString())}] ${data}`
        if(node_env != 'production' && this._options.writeToFile) {
            fs.appendFile(this._options.filePath, data + '\n', (err) => {
                if(err) {
                    return;
                }
            });
        }
    }

    /**
     * @method getInstance
     * @description returns the instance of a class
     */

    static getInstance() {
        return new Logger();
    }
}

module.exports = Logger;