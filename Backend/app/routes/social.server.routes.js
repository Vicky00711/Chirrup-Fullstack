const auth= require("../../library/middleware");
const social= require("../controllers/social.controller");

module.exports = function(app){


   

    app.route('/users/:users_id/follow')
    .post(auth.isAuthenticated ,social.follow_someone);

    app.route('/users/:users_id/follow')
    .delete(auth.isAuthenticated,social.delete_following);

    app.route('/users/:users_id')
    .get(social.getSingleuser);

    app.route('/author/:author_id')
    .get(social.postId);

    app.route('/search')
    .get(social.userSearch);
   
};