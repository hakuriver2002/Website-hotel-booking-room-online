var express = require('express');
var homeRouter = require('./home.routes');
var usersRouter = require('./users.routes');
var profileRouter = require('./profile.routes');
var adminRouter = require('./admin.routes');

function route(app) {
    app.use('/users', usersRouter);
    app.use('/profile', profileRouter);
    app.use('/admin', adminRouter);
    app.use('/', homeRouter);
}

module.exports = route;