module.exports = function(passport) {
  var express = require('express');
  var router = express.Router();

  var passport = require('passport');
  var GitHubStrategy = require('passport-github').Strategy;

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
      res.redirect('/');
    }
  );
  
  return router;
};