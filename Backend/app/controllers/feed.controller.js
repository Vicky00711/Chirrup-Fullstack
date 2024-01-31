const posts = require("../models/post.models");
const users = require("../models/user.models");
const config = require("../../config/config");
const feed = require("../models/feed.model");

const getPosts = (req, res) => {
  let token = req.get(config.get("authToken"));
  //feed for users who are logged in
  if (token) {
    users.getIdFromToken(token, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        feed.getAllLoggedinPosts(result, function (err, results) {
          if (err) return res.send(err);
          else {
            console.log(token);
            return res.send(results);
          }
        });
      }
    });
  } else {
    //feed for users who are not logged in
    feed.getAllPosts(function (err, result1) {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.send(result1);
      }
    });
  }
};

module.exports = {
  getPosts: getPosts,
};
