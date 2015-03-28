/**
 * Auth router
 *
 */

var express = require("express");
var router = express.Router();
var passport = require("passport");
var libs = require("../../libs");
var models = require("../../models");

var routes = libs.loader(__dirname);

// serialize settings
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  models.User.findById(id, done);
});

// default page
router.get("/", function (req, res) {
  res.redirect(302, "/auth/twitter");
});

router.use("/twitter", routes.twitter);

// authentication failure
router.get("/fail", function (req, res) {
  console.error(req.flash("error"));
  req.flash("error", {message: "認証失敗"});
  res.redirect(302, "/");
});

module.exports = router;
