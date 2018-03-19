var express = require('express');
var router = express.Router();

var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy;

/* GET home page. */
router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'signin' });
});



module.exports = router;
