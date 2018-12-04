const router = require('express').Router();
const lib = require('../lib/helpers.js');
const DBACCESS = require('../lib/server.js');

const passport = require('passport');
require('../config/passport')(passport);

const ERRORS = {
    notFound: 'Request method cannot be found.',
    methodError: 'Method cannot be executed:'
};

const registerDbApi = function(reqMethod) {
    if (!reqMethod || !DBACCESS[reqMethod]) return lib.sendError(res, 405, ERRORS.notFound);

    try {
        const request = DBACCESS[reqMethod];
        router[request.method](request.path || '/', passport.authenticate('jwt', { session: false }), function(req, res) {
            var auth = lib.isAuthenticated(req.headers);
            if (!auth.ok) return sendError(res, auth.statusCode || 405, auth.body);
            return request.action(req, res);
        });
    } catch (e) {
        console.error(`${ERRORS.methodError} ${reqMethod}`);
    }
};

/**
 * Set CRUD anf get all users API 
*/
registerDbApi('getAll');
registerDbApi('findById');
registerDbApi('create');
registerDbApi('update');
registerDbApi('delete');

module.exports = router;
