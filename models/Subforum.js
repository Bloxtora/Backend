let mongoose = require("mongoose");
let SubforumSchema = mongoose.Schema({
    _id: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  posts: {
    type: Array,
    require: true
  },
});


module.exports = Subforum = mongoose.model("subforums", SubforumSchema);