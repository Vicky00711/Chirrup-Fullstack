const auth= require('../../library/middleware');
const feed= require('../controllers/feed.controller');
module.exports = function (app) {
  app.route('/feed')
  .get(feed.getPosts);
};
