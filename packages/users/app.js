var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');

var userRoute = require('./routes/user');
var authRoute = require('./routes/auth');
var app = express();

mongoose.Promise = bluebird;
mongoose
    .connect('mongodb://localhost/crud-users', {
        useMongoClient: true, promiseLibrary: bluebird 
    })
    .then(() => console.log('Connection succesful!'))
    .catch(err => console.error(err));


/*
 * Ensure to always have default HTML view engine
 */
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'false' }));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
