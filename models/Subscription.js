/**
 * Subscription
 *
 */

var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  id: {
    type: String,
    index: {unique: true},
    required: true
  },
  name: {
    type: String,
    default: "no name",
    required: true
  },
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

module.exports = mongoose.model("Subscription", schema);
