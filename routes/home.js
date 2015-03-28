/**
 * Home router
 *
 */

var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", function (req, res) {
  res.locals.template = "home";
  res.locals.title = "Home | ";
  res.render(res.locals.template);
});

module.exports = router;
