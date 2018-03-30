module.exports = function(passport) {
  var express = require('express');
  var router = express.Router();

  var passport = require('passport');
  var GitHubStrategy = require('passport-github').Strategy;
  
  var github = require('octonode');
  var Bitbucket = require('bitbucket-v2')
  var bitbucketApi = new Bitbucket({useXhr: true}); //or: new Bitbucket({useXhr: true})
  
  var https = require('../modules/utils/https');
  var request = require('request');
  

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
    
    const accessToken = req.query.accessToken;
    
    const type = req.query.type;
    if (type === 'github') {
      var client_id = process.env.GITHUB_CLIENT_ID;
      var secret = process.env.GITHUB_SECRET;
      
      const auth_string = (client_id+':'+secret).toString('base64');
    
      const options = {
        url: `https://api.github.com/applications/${client_id}/tokens/${accessToken}`,
        method: 'POST',
        headers: {
          'User-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.0 Safari/537.36'
        },
        auth: {
          'user': client_id,
          'pass': secret
        }
      }
    } else {
      var client_id = process.env.BITBUCKET_CLIENT_ID;
      var secret = process.env.BITBUCKET_SECRET;
    }

    
    
    request(options, function (err, _res, body) {
      res.json(JSON.parse(body));
    });
    
  });
  
  return router;
};