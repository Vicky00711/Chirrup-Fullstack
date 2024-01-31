const users = require("../models/user.models");
const posts = require("../models/post.models");
const social = require("../models/social.models");
const config = require("../../config/config");

const getSingleuser = (req, res) => {
  let id = parseInt(req.params.users_id);
  social.getSingleUser1(id, function (err, result) {
    if (err) return res.status(500).send(err);
    else if (!result) res.status(404).send("User not found");
    else return res.send(result);
  });
};

const postId = (req, res) => {
  let id = parseInt(req.params.author_id);
  social.postIds(id, function (err, result) {
    if (err) return res.send(err);
    return res.send(result);
  });
};

const follow_someone = (req, res) => {
  let user_ids = parseInt(req.params.users_id);

  social.getSingleUser1(user_ids, function (err, result) {
    if (err) {
      return res.status(500).send(err);
    } else if (!result) res.status(404).send("User not found");
    else {
      let token = req.get(config.get("authToken"));
      users.getIdFromToken(token, function (err, user_id) {
        if (err) {
          return res.status(500).send(err);
        } else if (
          result.followers.some((follower) => follower.user_id === user_id)
        ) {
          return res.status(403).send("Already following this user");
        } else {
          social.add_following(user_id, user_ids, function (err, result) {
            if (err) return res.status(500).send(err);
            else {
              res.status(200).send("Ok");
            }
          });
        }
      });
    }
  });
};

const delete_following = (req, res) => {
  let user_ids = parseInt(req.params.users_id);
  social.getSingleUser1(user_ids, function (err, result) {
    if (err) {
      return res.status(500).send(err);
    } else if (!result) res.status(404).send("User not found");
    else {
      let token = req.get(config.get("authToken"));
      users.getIdFromToken(token, function (err, user_id) {
        if (err) {
          return res.status(500).send(err);
        } else if (
          !result.followers.find((follower) => follower.user_id === user_id)
        ) {
          return res
            .status(403)
            .send("Cannot unfollow someone whom you don't follow");
        } else {
          social.stop_following(user_id, user_ids, function (err, result) {
            if (err) return res.status(500).send(err);
            else {
              res.status(200).send("Ok");
            }
          });
        }
      });
    }
  });
};

const userSearch = (req, res) => {
  let params = req.query;

  let params_valid = true;

  if (!params_valid) {
    return res.status(400).send("Parameters not valid");
  }
  social.search_users(params, function (err, result) {
    if (err) return res.send(500);
    return res.status(200).send(result);
  });
};

module.exports = {
  postId: postId,
  getSingleuser: getSingleuser,
  follow_someone: follow_someone,
  delete_following: delete_following,
  userSearch: userSearch,
};
