let mongoose = require("mongoose");
let autoIncrement = require('mongoose-auto-increment');

let Identitycounter = mongoose.Schema({
  count: {
    type: Number,
    require: true
  }
});

module.exports = Identitycounter = mongoose.model("Identitycounter", Identitycounter);