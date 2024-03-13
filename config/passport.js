const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/usermodel');

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email }, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;

// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/usermodel');

// passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
//   try {
//     const user = await User.findOne({ email: email });
//     if (!user) {
//       return done(null, false, { message: 'Incorrect email.' });
//     }
//     const isMatch = await user.validatePassword(password);
//     if (!isMatch) {
//       return done(null, false, { message: 'Incorrect password.' });
//     }
//     return done(null, user);
//   } catch (err) {
//     return done(err);
//   }
// }));

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });

// module.exports = passport;

