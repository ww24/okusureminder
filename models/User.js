/**
 * User model
 *
 */

var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subscriptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription"
  }],
  twitter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Twitter",
    required: true
  },
  medicines: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medicine"
  }],
  created_at: {
    type: Date,
    default: Date.now,
    required: true
  },
  updated_at: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model("User", schema);
