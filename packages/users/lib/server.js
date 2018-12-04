const User = require('../models/User.js');
const lib = require('./helpers.js');

/**
 * Define global variables that may often change
 */
const MAPPED_FIELDS = ['_id', 'email', 'fname', 'lname', 'biography'];
const ERRORS = {
    noId: 'No id provided.',
    noDetails: 'Missing doc id or details.',
    noEmail: 'No email or password provided.'
};

/**
 * 
 * @param {Object} users - Object or array of objects containing raw user details.
 * @param {Number} userIndex - User index from the array of users.
 * @param {Array} newData - New array of all filtered user details.
 * @return {Array} Copy of users with filtered details.
 */
function mapUserFields (users = [], userIndex = 0, newData = []) {
    if (!Array.isArray(users)) {
        // If 1 document is provided, map it and return an array with its copy
        if (users && typeof users === 'object') return mapUserFields([users]);
        console.error('[USERS must be an array]', typeof users);
        return [];
    }
    // end case, return the mapped data if end of array
    if (userIndex === users.length) return newData;

    // or continue to map until it's reached
    let user = {};
    MAPPED_FIELDS.forEach(field => {
        if (users[userIndex]) user[field] = users[userIndex][field] || '';
    });
    newData.push(user);
    return mapUserFields(users, userIndex+1, newData);
};


/**
 * DB Configurations. 
 */
module.exports = {
    // Get all existing users from DB.
    // TODO: add pagination
    getAll: {
        method: 'get',
        action: function(req, res) {
            User.find(function(err, users) {
                if (err) return lib.sendError(res, 404, err);
                res.json( mapUserFields(users) );
            });
        }
    },
    // Get user by provided id (string:required)
    findById: {
        method: 'get',
        path: '/:id',
        action: function(req, res) {
            if (!(req.params || {}).id) return lib.sendError(res, 400, ERRORS.noId);
            User.findById(req.params.id, function(err, userDoc) {
                if (err) return lib.sendError(res, 404, err);
                res.json( mapUserFields(userDoc) );
            });
        }
    },
    // Create/register new user 
    // email (string:required)
    // password (string:required)
    create: {
        method: 'post',
        action: function(req, res) {
            const body = req.body || {};
            if (!body.email || !body.password) return lib.sendError(res, 400, ERRORS.noEmail);
            User.create(req.body, function(err, userDoc) {
                if (err) return lib.sendError(res, 404, err);
                res.json( mapUserFields(userDoc) );
            });
        }
    },
    // Update existing user by id (string:required)
    // req.body (object:required) - min length 1
    update: {
        method: 'put',
        path: '/:id',
        action: function(req, res) {
            if (!(req.params || {}).id || 
                !Object.keys(req.body || {}).length
            ) return lib.sendError(res, 400, ERRORS.noDetails);

            User.findByIdAndUpdate(req.params.id, req.body, function(err, userDoc) {
                if (err) return lib.sendError(res, 404, err);
                res.json( mapUserFields(userDoc) );            
            });
        }
    },
    // Delete an existing user by id (string:required)
    // req.body (object:required) - min length 1
    delete: {
        method: 'delete',
        path: '/:id',
        action: function(req, res) {
            if (!(req.params || {}).id ) return lib.sendError(res, 404, ERRORS.noId);
            User.findByIdAndRemove(req.params.id, req.body, function (err, userDoc) {
                if (err) return next(err);
                res.json( mapUserFields(userDoc) );
            });
        }
    }
};