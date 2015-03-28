/**
 * GCM push
 *
 */

const API_END_POINT = "https://android.googleapis.com/gcm/send";

var request = require("request");
var config = require("config");

exports.create = function (registration_ids, callback) {
  if (! Array.isArray(registration_ids)) {
    throw new TypeError("registration_ids is must be array.");
  }

  request.post({
    url: API_END_POINT,
    headers: {
      Authorization: "key=" + config.gcm.api_key
    },
    json: true,
    body: {
      registration_ids: registration_ids
    }
  }, function (err, req, data) {
    if (req.statusCode !== 200) {
      return callback && callback(err || new Error("status:" + req.statusCode));
    }
    callback && callback(err, data);
  });
};
