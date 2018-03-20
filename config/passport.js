module.exports = function (app) {
  var passport = require('passport')
  var LocalStrategy = require('passport-local').Strategy;
  var GitHubStrategy = require('passport-github').Strategy;
  var BitbucketStrategy = require('passport-bitbucket-oauth2').Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

// 여기서 정의한 함수가 사용자 인증에 사용된다

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: '/auth/github/callback',
  },
  function (accessToken, refreshToken, profile, done) {
     done(null,{
       accessToken: accessToken,
       refreshToken: refreshToken,
       profile: profile
     });
  }));
  
  passport.use(new BitbucketStrategy({
      clientID: process.env.BITBUCKET_CLIENT_ID,
      clientSecret: process.env.BITBUCKET_SECRET,
      callbackURL: "/auth/bitbucket/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      done(null,{
       accessToken: accessToken,
       refreshToken: refreshToken,
       profile: profile
     });
    }
  ));

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