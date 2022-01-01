let express = require("express");
let passport = require("passport");
let bcrypt = require("bcrypt");
const jsonwt = require("jsonwebtoken");
const hcaptcha = require('express-hcaptcha');
let Post = require("../../models/Subforum");
let router = express.Router();

// Get all posts
router.get("/list", async (req, res) => {
  const posts = await Post.find()
    .select("-__v").limit(10)  // use skip and limit value as you want. 
  res.send(posts);
})

router.post("/reply", passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.body.content && req.body.title && req.body.orignal && req.body.thread) {
      let newPost = {
        orignal: req.body.orignal,
        username: req.user.name,
        title: req.body.title,
        content: req.body.content,
        time: Date.now(),
      }
 
      const query = Post.where({ _id: req.body.orignal });
      query.findOne(function(err, results) {
        if (err) return handleError(err);
        if (results) {
         let e = parseFloat(req.body.thread)
          if (e >= results.posts.length) {
            res.send("error")
          } else {
          results.posts[e].replys.push(newPost)    
          results.updateOne(
            { $set: { posts: results.posts } },
            (err, brote) => {
            })
          res.send(results)
          }
        }
      })


    } else {
      res.send("One of the fields required is blank")
    }
  })

module.exports = router