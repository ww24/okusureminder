/**
 * Twitter OAuth
 *
 */

var express = require("express");
var router = express.Router();
var passport = require("passport");
var TwitterStrategy = require("passport-twitter").Strategy;
var models = require("../../models");
var config = require("config");

// initialize authenticate
passport.use(new TwitterStrategy(config.twitter, function (key, secret, profile, done) {
  var twitter = {
    id: profile._json.id,
    name: profile._json.name,
    screen_name: profile._json.screen_name,
    icon_url: profile._json.profile_image_url_https,
    key: key,
    secret: secret
  };

  models.Twitter.findOneAndUpdate({
    id: twitter.id
  }, twitter, {
    upsert: true
  }).exec().then(function (twitter) {
    return models.User.findOneAndUpdate({twitter: twitter._id}, {
      name: twitter.name,
      twitter: twitter._id
    }, {
      upsert: true
    }).exec();
  }).then(function (user) {
    console.log(user);
    done(null, user);
  }, function (err) {
    console.error(err);
    return done(err);
  });
}));

// initialize auth token
var token = Math.floor(Math.random() * Math.pow(10, 8));

// twitter auth
router.get("/", function (req, res, next) {
  req.flash("authenticate");
  req.flash("authenticate", token);
  next();
});
router.get("/", passport.authenticate("twitter"));

// twitter auth callback
router.get("/callback", function (req, res, next) {
  if (req.flash("authenticate")[0] === token) {
    return next();
  }

  req.session.status = "ng";
  req.flash("error", {message: "予期せぬ認証エラー。再認証してください。"});
  res.redirect(302, "/");
});
router.get("/callback", passport.authenticate("twitter", {
  failureRedirect: "/auth/fail",
  failureFlash: true
}), function (req, res) {
  res.redirect(302, "/home");
});

module.exports = router;
