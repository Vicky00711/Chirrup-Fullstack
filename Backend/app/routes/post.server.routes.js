
const auth= require('../../library/middleware');
const post= require('../controllers/post.controller');
module.exports = function(app){


    app.route('/posts')
    .post(auth.isAuthenticated,post.add_new_posts);

    app.route('/posts/:post_id')
    .get(post.get_post);

    

    app.route('/posts/:post_id')
    .patch(auth.isAuthenticated,post.updating_a_post);

    app.route('/posts/:post_id')
    .delete(auth.isAuthenticated,post.delete_post);

    app.route('/posts/:post_id/like')
    .post(auth.isAuthenticated,post.like_post);

    app.route('/posts/:post_id/like')
    .delete(auth.isAuthenticated,post.unliking);
};