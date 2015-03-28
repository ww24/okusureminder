/**
 * API end point
 *
 */

var express = require("express");
var router = express.Router();
var validator = require("validator");
var models = require("../models");
var libs = require("../libs");

router.get("/", function (req, res) {
  res.json({
    status: "ok"
  });
});

router.post("/subscribe", function (req, res, next) {
  var subscription_id = req.body.id;

  if (! validator.isLength(subscription_id, 1)) {
    var err = new Error("Bad Request");
    err.status = 400;
    return next(err);
  }

  models.Subscription.create({
    id: subscription_id
  }).then(function (subscription) {
    return models.User.findById(req.user._id).exec().then(function (user) {
      user.subscriptions.push(subscription);
      return user.save();
    });
  }, function (err) {
    if (err.code !== 11000) {
      throw err;
    }
    // duplicate (already)
    res.json({status: "ok"});
  }).then(function () {
    res.json({status: "ok"});
  }, function (err) {
    err.status = 500;
    console.error(err);
    return next(err);
  });
});

router.post("/push", function (req, res) {
  models.User.findById(req.user._id).populate("subscriptions").exec().then(function (user) {
    var subscription_ids = user.toJSON().subscriptions.map(function (subscription) {
      return subscription.id;
    });
    console.log(subscription_ids);
    libs.push.create(subscription_ids, function (err, data) {
      console.log(data);
      if (err) {
        console.error(err);
        return res.status(500);
      }
      res.json({status: "ok", data: data});
    });
  }, function (err) {
    console.error(err);
    res.status(500);
  });
});

module.exports = router;
