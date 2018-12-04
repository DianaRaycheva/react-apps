var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
var router = require('express').Router();
var User = require('../models/User');

router.post('/create', function(req, res) {
    const body = req.body || {};
    if (!body.email || !body.password) return res.json({ 
        success: false, msg: 'Please pass email and password.' 
    });

    var newUser = new User({
        email: body.email,
        password: body.password,
        fname: body.fname,
        lname: body.lname,
        biography: body.biography || '',
    });

    newUser.save(function(err) {
        if (err) return res.json({ success: false, msg: 'Email already exists.' });
        res.json({ success: true, msg: 'New user has been created.' });
    });
});

router.post('/login', function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) return res.status(401).send({ 
            success: false, 
            message: 'Authentication failed. User cannot be found.',
            body: req.body
        });
            
        user.comparePassword(req.body.password, function(err, isMatch) {
            if (!isMatch || err) return  res.status(401).send({ 
                success: false, 
                message: 'Authentication failed. Wrong do not match.' 
            });

            // if password is matching, create a token
            var token = jwt.sign(user.toJSON(), settings.secret);
            res.json({ success: true, token: 'JWT ' + token });
        });  
    });
});

module.exports = router;
