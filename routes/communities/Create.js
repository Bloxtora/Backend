let express = require("express");
let passport = require("passport");
let bcrypt = require("bcrypt");
const jsonwt = require("jsonwebtoken");
const hcaptcha = require('express-hcaptcha');
let Community = require("../../models/Community");
let router = express.Router();

// Get all post
router.get("/list", async (req, res) => {
    const posts = await Post.find()
    .select("-__v").limit(10)  // use skip and limit value as you want. 
    res.send(posts);
})

router.post("/create", passport.authenticate("jwt", { session: false }),
    (req, res) => {
      if (req.body.name,req.body.description) {
        if (req.user.prisms >= 20) {
        let newCommunity = new Community({
          owner: req.user.name,
          ownerId: req.user._id,
          title: req.body.name,
          description: req.body.description,
          members: [req.user._id],
          games: [],
          memberCount: 1,
          time: Date.now(),
          chat: []
        });
        newCommunity
          .save()
          .then(() => {
            res.status(200).send(newCommunity);
          })
          .catch(err => {
            console.log("Error is ", err.message);
          });
        } else {
          console.log(req.user)
          let ending = 20-req.user.prisms
          res.send("You need "+ending+" more prisms to create a group.")
        }
      } else {
        res.send("One of the fields required is blank.")
      }
})

module.exports = router