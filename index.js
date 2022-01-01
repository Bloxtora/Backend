let express = require("express");
let mongoose = require("mongoose");
let bodyparser = require("body-parser");
let passport = require("passport");
const fs = require('fs')
let db = require("./mysetup/myurl").myurl;
let app = express();
let User = require("./routes/users/User");
const cors = require('cors')
app.use(cors());

let port = process.env.PORT || 3000;
//t
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

mongoose
  .connect(db)
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log("Error is ", err.message);
  });

//Passport middleware
app.use(passport.initialize());

//Config for JWT strategy
require("./strategies/jsonwtStrategy")(passport);

app.get("/", (req, res) => {
  res.status(200).send(`Welcome to the Bloxtora API. How did you get here, lost traveler? Found any bugs? Report them to any staff member, thanks!`);
});

let usersInfo = {
  "dir": './routes/users/', // requires the / at the end
  "aftername": '/users' // what goes after the name ("api.bloxtora.site/users")
}

fs.readdir(usersInfo.dir, (err, files) => {
  files.forEach(file => {
    app.use(usersInfo.aftername, require(usersInfo.dir + file));
  });
});

let forumsInfo = {
  "dir": './routes/forums/', // requires the / at the end
  "aftername": '/forums' // what goes after the name ("api.bloxtora.site/users")
}

fs.readdir(forumsInfo.dir, (err, files) => {
  files.forEach(file => {
    app.use(forumsInfo.aftername, require(forumsInfo.dir + file));
  });
});

let adminInfo = {
  "dir": './routes/admin/', // requires the / at the end
  "aftername": '/admin' // what goes after the name ("api.bloxtora.site/users")
}

fs.readdir(adminInfo.dir, (err, files) => {
  files.forEach(file => {
    app.use(adminInfo.aftername, require(adminInfo.dir + file));
  });
});

let communityInfo = {
  "dir": './routes/communities/', // requires the / at the end
  "aftername": '/community' // what goes after the name ("api.bloxtora.site/users")
}

fs.readdir(communityInfo.dir, (err, files) => {
  files.forEach(file => {
  app.use(communityInfo.aftername, require(communityInfo.dir + file));
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});