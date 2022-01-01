let express = require("express");
let passport = require("passport");
let bcrypt = require("bcrypt");
const jsonwt = require("jsonwebtoken");
const hcaptcha = require('express-hcaptcha');
let User = require("../../models/User");
let router = express.Router();

router.post("/status", passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const query = User.where({ _id: req.body.id });
    query.findOne(function(err, results) {
      if (err) return handleError(err);
      if (results) {
    
              results.updateOne(
                { $set: { status: req.body.status } },
                (err, brote) => {
                })
                res.send(results)
            }
          })
  })
module.exports = router