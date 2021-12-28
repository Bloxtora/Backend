let express = require("express");
let passport = require("passport");
let bcrypt = require("bcrypt");
const jsonwt = require("jsonwebtoken");
const hcaptcha = require('express-hcaptcha');
let User = require("../../models/User");
let router = express.Router();

router.post("/ban", passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user.admin)
    if (req.user.admin == true && req.body.id) {
      const query = User.where({ _id: req.body.id });
      query.findOne(function(err, results) {
        if (err) return handleError(err);
        if (results) {
          res.send("Banned: " + results.name + "")
          results.updateOne(
            { $set: { name: "deleted user [" + results._id + "]" } },
            (err, brote) => {    // callback
            })
          results.updateOne(
            { $set: { banned: true } },
            (err, brote) => {    // callback
            })
        }
      })
    } else {
      res.send("Unauthorized")
    }

  })

module.exports = router