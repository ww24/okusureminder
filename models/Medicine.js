/**
 * Medicine model
 *
 */

var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // 薬のタイプ
  type: {
    type: String,
    // 内用薬, 外用薬, 坐薬, 軟膏, 点眼薬, 湿布
    enum: ["internal", "external", "suppository", "ointment", "eyedrops", "poultice"]
  },
  // 残量
  quantity: {
    type: Number,
    default: 0,
    required: true
  },
  // 使用する時間帯 (複数可)
  timing: [{
    type: String,
    enum: ["morning", "midday", "night"],
    required: true
  }],
  // 1回当たりに使用する数
  quantityOfTime: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Medicine", schema);
