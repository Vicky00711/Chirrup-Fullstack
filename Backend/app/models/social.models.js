const db = require("../../database");

const getSingleUser1 = (id, done) => {
  if (id === null || id === undefined) {
    return done("Invalid id", null);
  }

  const sqlUser =
    "SELECT user_id, first_name, last_name, username FROM users WHERE user_id=?";
  db.get(sqlUser, [id], (err, result) => {
    if (err || !result) return done(err, null);

    const sqlFollowing =
      "SELECT user_id, first_name, last_name, username FROM users WHERE user_id IN (SELECT follower_id FROM followers WHERE user_id=?)";

    db.all(sqlFollowing, [id], (err, following) => {
      if (err) return done(err, null);

      const sqlFollowers =
        "SELECT user_id, first_name, last_name, username FROM users WHERE user_id IN (SELECT user_id FROM followers WHERE follower_id=?)";

      db.all(sqlFollowers, [id], (err, followers) => {
        if (err) return done(err, null);

        const sqlPost =
          "SELECT p.post_id, p.date_published, p.text, u.user_id, u.first_name, u.last_name, u.username FROM posts p, users u WHERE p.author_id=u.user_id AND p.author_id=?";
        db.all(sqlPost, [id], (err, posts) => {
          if (err) return done(err, null);

          const userDetails = {
            user_id: result.user_id,
            first_name: result.first_name,
            last_name: result.last_name,
            username: result.username,
            followers: followers,
            following: following,
            posts: [],
          };

          let counter = 0; //counter to keep the count of the loop
          if (posts.length === 0) {
            return done(null, userDetails); // if there is no posts then return the existing userdetails with an empty post array
          }

          posts.forEach((post) => {
            const sqlLikes =
              "SELECT u.user_id, u.first_name, u.last_name, u.username FROM users u, likes l WHERE l.post_id=? AND l.user_id=u.user_id";

            db.all(sqlLikes, [post.post_id], (err, likes) => {
              if (err) return done(err, null);

              const posts_details = {
                post_id: post.post_id,
                timestamp: post.date_published,
                text: post.text,
                author: {
                  user_id: post.user_id,
                  first_name: post.first_name,
                  last_name: post.last_name,
                  username: post.username,
                },
                likes: likes,
              };

              userDetails.posts.push(posts_details);

              counter++;
              if (counter === posts.length) {
                return done(null, userDetails); //if the counter matches the length of the posts then it will push the new pots details and return the final array
              }
            });
          });
        });
      });
    });
  });
};

const add_following = (id, user_ids, done) => {
  if (
    user_ids === undefined ||
    user_ids === null ||
    id === undefined ||
    id === null
  ) {
    return done("Enter valid parameters", null);
  } else {
    let sql = "Insert into followers (user_id, follower_id) Values (?,?)";
    let values = [id, user_ids];

    db.run(sql, values, function (err, result) {
      if (err) return done(true, null);
      return done(null, result);
    });
  }
};

const stop_following = (id, user_ids, done) => {
  if (
    user_ids === undefined ||
    user_ids === null ||
    id === undefined ||
    id === null
  ) {
    return done("Enter valid parameters", null);
  } else {
    let sql = "Delete from followers where user_id= ? And follower_id=?";
    let value = [id, user_ids];

    db.run(sql, value, function (err) {
      if (err) return done(true);
      return done(null);
    });
  }
};

const search_users = (params, done) => {
  let query =
    "SELECT u.user_id, u.first_name, u.last_name, u.username FROM users u ";

  if (params.q) {
    query +=
      "WHERE u.first_name LIKE '%" +
      params.q +
      "%' OR u.last_name LIKE '%" +
      params.q +
      "%' OR u.username LIKE '%" +
      params.q +
      "%' ";
  }

  db.all(query, async function (err, users) {
    if (err) {
      console.log(err);
      return done(err, false);
    } else if (users.length == 0) {
      console.log("empty");
      return done(err, []);
    } else {
      return done(null, users);
    }
  });
};

module.exports = {
  getSingleUser1,
  getSingleUser1,
  search_users: search_users,
  add_following: add_following,
  stop_following: stop_following,
};
