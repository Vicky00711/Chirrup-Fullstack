const db = require("../../database");

const getAllPosts = (done) => {
  const sqlPost =
    "SELECT p.post_id, p.date_published, p.text, u.user_id, u.first_name, u.last_name, u.username FROM posts p inner join users u on  p.author_id=u.user_id ";
  db.all(sqlPost, [], (err, posts) => {
    if (err) return done(err, null);

    const userDetails = [];

    let counter = 0; //to keep the count of the loop
    if (posts.length === 0 || !posts) {
      return done(null, userDetails); //if there is no posts just return the empty userdetails array
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

        userDetails.push(posts_details);

        counter++;
        if (counter === posts.length) {
          //using sort because this is an asyn operation and sometimes in async operations the order by in the query doesn't properly work
          userDetails.sort((a, b) => {
            return b.timestamp - a.timestamp;
          });
          return done(null, userDetails);
        }
      });
    });
  });
};

const getAllLoggedinPosts = (id, done) => {
  //Merging all the tables using joins
  const sqlPosts = `SELECT p.post_id, p.date_published, p.text, 
    u.user_id AS author_id, u.first_name AS author_first_name, u.last_name AS author_last_name, u.username AS author_username,
    ul.user_id AS liker_id, ul.first_name AS liker_first_name, ul.last_name AS liker_last_name, ul.username AS liker_username
    FROM posts p
    INNER JOIN users u ON p.author_id = u.user_id
    LEFT JOIN likes l ON p.post_id = l.post_id
    LEFT JOIN users ul ON l.user_id = ul.user_id
    WHERE p.author_id = ? OR p.author_id IN (SELECT follower_id FROM followers WHERE user_id = ?)
    ORDER BY p.date_published DESC`;

  db.all(sqlPosts, [id, id], (err, rows) => {
    if (err) return done(err, null);

    const posts = [];

    rows.forEach((row) => {
      //loops through the array and finds the post and returns a boolean
      const existingPost = posts.find((post) => post.post_id === row.post_id);

      //if there is no existing posts then create a new newPOst object
      if (!existingPost) {
        const newPost = {
          post_id: row.post_id,
          timestamp: row.date_published,
          text: row.text,
          author: {
            user_id: row.author_id,
            first_name: row.author_first_name,
            last_name: row.author_last_name,
            username: row.author_username,
          },
          likes: [],
        };

        if (row.liker_id) {
          newPost.likes.push({
            user_id: row.liker_id,
            first_name: row.liker_first_name,
            last_name: row.liker_last_name,
            username: row.liker_username,
          });
        }

        posts.push(newPost);
      } else {
        if (row.liker_id) {
          existingPost.likes.push({
            user_id: row.liker_id,
            first_name: row.liker_first_name,
            last_name: row.liker_last_name,
            username: row.liker_username,
          });
        }
      }
    });

    //using sort because this is an asyn operation and sometimes in async operations the order by in the query doesn't properly work
    const sortedPosts = posts.sort(
      (a, b) => b.date_published - a.date_published
    );
    return done(null, sortedPosts);
  });
};

module.exports = {
  getAllPosts: getAllPosts,
  getAllLoggedinPosts: getAllLoggedinPosts,
};
