var express = require('express');

class App {
    constructor () {
        return express();
    }
    static getInstance () {
        return new App();
    }
}

module.exports = App;