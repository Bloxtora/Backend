let mongoose = require("mongoose");
let autoIncrement = require('mongoose-auto-increment');

let CommunitySchema = mongoose.Schema({
  owner: {
    type: String,
    require: true
  },
    ownerId: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  memberCount: {
    type: Number,
    require: true
  },
  time: {
    type: String,
    require: true
  },
  members: {
    type: Array,
    require: true
  },
  games: {
    type: Array,
    require: true
  },
    chat: {
    type: Array,
    require: true
  }
});

autoIncrement.initialize(mongoose.connection);
CommunitySchema.plugin(autoIncrement.plugin, 'Community');


module.exports = Community = mongoose.model("Community", CommunitySchema);