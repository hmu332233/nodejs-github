module.exports = function (app) {
  var passport = require('passport')
  var LocalStrategy = require('passport-local').Strategy
  var GitHubStrategy = require('passport-github').Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

// 여기서 정의한 함수가 사용자 인증에 사용된다

  passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/github/callback',
  },
  function (accessToken, refreshToken, profile, done) {
     done(null,{
       accessToken: accessToken,
       refreshToken: refreshToken,
       profile: profile
     });
  }));

  passport.serializeUser(function (data, done) {
    console.log('serializeUser', data.profile.id)
    done(null, data.profile.id)
  });

  passport.deserializeUser(function (id, done) {
    console.log('deserializeUser', id)
    done(null, id);
  })

  return passport
}