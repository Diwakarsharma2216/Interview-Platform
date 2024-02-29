// config/passport.js
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// GitHub Strategy
passport.use(new GitHubStrategy({
  clientID: 'your_github_client_id',
  clientSecret: 'your_github_client_secret',
  callbackURL: 'http://localhost:3000/auth/github/callback',
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ githubId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const newUser = new User({ githubId: profile.id, username: profile.username });
      await newUser.save();
      return done(null, newUser);
    } catch (error) {
      return done(error, null);
    }
  }
));

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: 'your_google_client_id',
  clientSecret: 'your_google_client_secret',
  callbackURL: 'http://localhost:3000/auth/google/callback',
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const newUser = new User({ googleId: profile.id, username: profile.displayName, email: profile.emails[0].value });
      await newUser.save();
      return done(null, newUser);
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
