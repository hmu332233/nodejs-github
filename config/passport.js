module.exports = function (app) {
  var passport = require('passport')
  var LocalStrategy = require('passport-local').Strategy
  var GitHubStrategy = require('passport-github').Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

// 여기서 정의한 함수가 사용자 인증에 사용된다

  passport.use(new GitHubStrategy({
    clientID: 'test',
    clientSecret: 'test',
    callbackURL: '/auth/github/callback',
  },
  function (accessToken, refreshToken, profile, done) {
     done(null,{
       accessToken: accessToken,
       refreshToken: refreshToken,
       profile: profile
     });
  }));

  passport.serializeUser(function (user, done) {
    console.log('serializeUser', user)
    done(null, user.id)
  });

  passport.deserializeUser(function (id, done) {
    console.log('deserializeUser', id)
    done(null, id);
  })

  return passport
}