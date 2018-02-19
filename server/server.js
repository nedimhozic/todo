'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var dotenv = require('dotenv').config();
var logger = require('morgan');
var dbClient = require('./tools/db_client');
var app = express();
var port = process.env.PORT || 3000;

function initialize() {
    var routes = require('./routes/routes');

    app.use(bodyparser.urlencoded({ extended: false }));
    app.use(bodyparser.json({ limit: '10mb' }));
    app.use(logger('dev'));

    routes.assignRoutes(app);

    app.listen(port);

    console.log('Server started on port ' + port);
}

dbClient.DBConnect()
    .then(() => {
        initialize();
    })
    .catch(err => {
        console.log('Error: ' + err)
    });