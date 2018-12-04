const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const settings = require('../config/settings'); // get settings file

module.exports = function(passport) {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: settings.secret
    };
 
    passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne(
          { id: jwt_payload.id }, 
          ( err, user ) => {
            if (err)  return done(err, false);
            if (user) return done(null, user);
            done(null, false); 
        });
      }));
};
