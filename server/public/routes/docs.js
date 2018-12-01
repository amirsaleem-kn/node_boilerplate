const app = require('../app');
const path = require('path');

// route handler for docs
app.get('/documentation/:version/:file', function(req, res){
    res.render(`${req.params.version}/${req.params.file}`, {
        title: `${req.params.file.replace('.html', '')} | Orgi ${req.params.version} Documentaion`,
        styles: ['static/css/index.css']
    });
});