let express = require("express");
let passport = require("passport");
let bcrypt = require("bcrypt");
const jsonwt = require("jsonwebtoken");
const hcaptcha = require('express-hcaptcha');
let Post = require("../../models/Subforum");
let router = express.Router();

// Get all post
router.get("/list", async (req, res) => {
    const posts = await Post.find()
    .select("-__v") // use skip and limit value as you want. 
    res.send(posts);
})
router.get("/api/:id", async (req, res) => {
 const query = Post.where({ _id: req.params.id });
  query.findOne(function(err, results) {
    if (err) console.log (err);
    if (results) {
res.send(results)
    }
  })
})

router.post("/create", passport.authenticate("jwt", { session: false }),
    (req, res) => {
      if (req.body.content && req.body.title && req.body.subforum) {
        Post.findOne({ _id: req.body.subforum })
        .then(results => {
        console.log(results)
        let newPost = {
          username: req.user.name,
          ownerId: req.user._id,
          title: req.body.title,
          content: req.body.content,
          votes: 0,
          time: Date.now(),
          replys: [],
          upvotes: [],
          downvotes: []
        }
Post.updateOne(
{ $push: { posts: newPost } },
(err, brote) => {
})
      results.posts.push(newPost)
      res.send(results)

  })
          .catch(err => {
            console.log("Error is ", err);
          });
      } else {
        res.send("One of the fields required is blank")
      }
})

module.exports = router