module.exports = function(passport) {
  var express = require('express');
  var router = express.Router();

  var passport = require('passport');
  var GitHubStrategy = require('passport-github').Strategy;
  
  var github = require('octonode');
  var Bitbucket = require('bitbucket-v2')
  var bitbucketApi = new Bitbucket({useXhr: true}); //or: new Bitbucket({useXhr: true})
  
  var https = require('../modules/utils/https');
  

  /* GET home page. */
  router.get('/signin', function(req, res, next) {
    res.render('signin', { title: 'signin' });
  });

  router.get('/logout', function(req, res) {
    req.logout();
    req.session.save(function() {
      res.redirect('/welcome');
    });
  });

  router.get('/github', passport.authenticate('github'));

  router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/auth/signin' }),
    function(req, res) {
      // Successful authentication, redirect home.

      var client = github.client(req.user.accessToken);
      client.me().repos(function (err, repos) {
        
        var result_string = JSON.stringify({
          accessToken: req.user.accessToken,
          refreshToken: req.user.refreshToken,
          profile: JSON.parse(req.user.profile._raw)
        });
        
        res.render('result', {
          result: {
            type: 'github',
            user: req.user,
            repos: repos
          },
          log: result_string
        });
      });
    
      
    }
  );
  
  router.get('/bitbucket', passport.authenticate('bitbucket'));

  router.get('/bitbucket/callback',
    passport.authenticate('bitbucket', { failureRedirect: '/auth/signin' }),
    function(req, res) {
      // Successful authentication, redirect home.
      
      var result_string = JSON.stringify({
        accessToken: req.user.accessToken,
        refreshToken: req.user.refreshToken,
        profile: JSON.parse(req.user.profile._raw)
      });

      res.render('result', {
        result: {
          type: 'bitbucket',
          user: req.user
        },
        log: result_string
      });

    }
  );
  
  router.get('/refresh', function (req, res) {
    res.json({test: 1});
  });
  
  return router;
};