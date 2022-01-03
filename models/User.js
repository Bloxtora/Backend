let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let autoIncrement = require('mongoose-auto-increment');
let UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
    email: {
    type: String,
    require: true
  },
  time: {
    type: String,
    require: true
  },
  followerCount: {
    type: Number,
    require: true
  },
  followers: {
    type: Array,
    require: true
  },
  following: {
    type: Array,
    require: true
  },
  inventory: {
    type: Array,
    require: true
  },
  banned: {
    type: Boolean,
    require: true
  },
  admin: {
    type: Boolean,
    require: true
  },
  gems: {
    type: Number,
    require: true
  },
  prisms: {
    type: Number,
    require: true
  },
    communities: {
    type: Array,
    require: true
  },
      notifications: {
    type: Array,
    require: true
  },
      friends: {
    type: Array,
    require: true
  },
      requests: {
    type: Array,
    require: true
  }
});

autoIncrement.initialize(mongoose.connection);
UserSchema.plugin(autoIncrement.plugin, 'User');

//authenticate input against database
UserSchema.statics.authenticate = function(name, password, callback) {
  User.findOne({ name: name }).exec(function(err, user) {
    if (err) {
      return callback(err);
    } else if (!user) {
      let err = new Error("User not found.");
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, function(err, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
      console.log(user)
    });
  });
};

module.exports = User = mongoose.model("User", UserSchema);