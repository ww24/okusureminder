/**
 * Index router
 *
 */

var express = require("express");
var router = express.Router();
var libs = require("../libs");
var routes = libs.loader(__dirname);
var auth = require("./auth");
var config = require("config");

// top page
router.get("/", function (req, res) {
  res.locals.template = "index";
  res.locals.title = "";
  res.render(res.locals.template);
});

// auth page
router.use("/auth", auth);
router.get("/logout", function (req, res) {
  req.logout();
  req.session.destroy && req.session.destroy();
  req.session = null;
  res.redirect(302, "/");
});

// ログイン後トップページ
router.use("/home", function (req, res, next) {
  if (! req.user) {
    return res.redirect(302, "/auth");
  }
  next();
});
router.use("/home", routes.home);

// API end point
router.use("/api", function (req, res, next) {
  if (! req.user) {
    return res.redirect(302, "/auth");
  }
  next();
});
router.use("/api", routes.api);

// catch 404
router.use(function (req, res) {
  res.status(404).send("Not Found");
});

module.exports = router;
