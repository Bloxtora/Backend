let express = require("express");
let passport = require("passport");
let bcrypt = require("bcrypt");
const jsonwt = require("jsonwebtoken");
const hcaptcha = require('express-hcaptcha');
let User = require("../../models/User");
let router = express.Router();

router.post("/give", passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user.admin)
    if (req.user.admin == true && req.body.id && req.body.type && req.body.num) {
      const query = User.where({ _id: req.body.id });
      query.findOne(function(err, results) {
        if (err) return handleError(err);
        if (results) {
res.send("Gave: "+results.name+" " +req.body.num+" "+req.body.type+"")
if (req.body.type == "gems") {
          results.updateOne(
            { $inc: { gems: req.body.num } },
            (err, brote) => {    // callback
            })
} else if (req.body.type == "prisms") {
          results.updateOne(
            { $inc: { prisms: req.body.num } },
            (err, brote) => {    // callback
            })
} else [
  res.send("error")
]
        }
      })
    } else {
      res.send("Unauthorized")
    }

  })

module.exports = router