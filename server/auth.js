var GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
require('dotenv').config();

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://chatbot-nmce.vercel.app/auth/google/callback",
    passReqToCallback: true
  },
  function (request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser(function (user, done) {
  // Serialize user information to be stored in the session
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  // Deserialize user information from the session
  done(null, user);
});
