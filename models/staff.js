let mongoose = require("mongoose");
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
    type: Array,
    require: true
  },
  StaffLevel: {
    type: Array,
    require: true
  },
  GroupId: {
    type: Array,
    require: true
  },
  DiscordId: {
    type: Array,
    require: true
  },
});


module.exports = Staff = mongoose.model("staff", StaffSchema);