let mongoose = require("mongoose");
let autoIncrement = require('mongoose-auto-increment');

let StaffSchema = mongoose.Schema({
    _id: {
    type: String,
    require: true
  },
  GameName: {
    type: String,
    require: true
  },
  StaffName: {
    type: String,
    require: true
  },
  StaffLevel: {
    type: String,
    require: true
  },
  GroupId: {
    type: String,
    require: true
  },
  DiscordId: {
    type: String,
    require: true
  },
  FinishedSem: {
    type: Boolean,
    require: true
  },
  SeminarId: {
    type: String,
    require: true
  },
  AccActive: {
    type: Boolean,
    require: true
  },
});

autoIncrement.initialize(mongoose.connection);
StaffSchema.plugin(autoIncrement.plugin, 'staff');

module.exports = Staff = mongoose.model("staff", StaffSchema);