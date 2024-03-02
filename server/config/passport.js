// config/passport.js
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;

// Local Strategy
passport.use(new LocalStrategy(
  {
    usernameField: 'email', // Assuming you're using email for login, adjust as needed
    passwordField: 'password', // Assuming your password field is named 'password', adjust as needed
  },
  async (email, password, done) => {
    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        return done(null, false, { message: 'Invalid email' });
      }

      const isValidPassword = await user.isValidPassword(password);

      if (!isValidPassword) {
        return done(null, false, { message: 'Invalid password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error, false, { message: 'Internal Server Error' });
    }
  }
));


// GitHub Strategy
passport.use(new GitHubStrategy({
  clientID: 'b7bcfa5d507c47d55b05',
  clientSecret: 'a7ae5ce4f24d2998e1bc4c0278d80bdd4d979893',
  callbackURL: 'http://localhost:3000/auth/github/callback',
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await UserModel.findOne({ githubId: profile.id });
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
  UserModel.findById(id, (err, user) => {
    done(err, user);
  });
});


module.exports = passport;