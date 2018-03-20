module.exports = function(passport) {
  var express = require('express');
  var router = express.Router();

  var passport = require('passport');
  var GitHubStrategy = require('passport-github').Strategy;
  
  var github = require('octonode');

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
        
        res.json({
          user: req.user,
          repos: repos
        });
        
      });
    
      
    }
  );
  
  router.get('/bitbucket', passport.authenticate('bitbucket'));

  router.get('/bitbucket/callback',
    passport.authenticate('bitbucket', { failureRedirect: '/auth/signin' }),
    function(req, res) {
      // Successful authentication, redirect home.

     res.json(req.user);
    }
  );
  
  return router;
};