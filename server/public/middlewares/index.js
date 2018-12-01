const app = require('../app');
const express = require('express');
const logger = require('../../lib/logger');
const path = require('path');

app.use(logger.logHttpRequest.bind(logger));
app.use('/static',express.static(path.join(__dirname, '../../../', '/static')));

app.engine('html', require('hogan-express'));
app.set('partials', {
    sidebar: 'v1/templates/sidebar',
    header: 'v1/templates/header',
    footer: 'v1/templates/footer',
    links: 'v1/templates/links'
});
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../../../' , '/docs'));