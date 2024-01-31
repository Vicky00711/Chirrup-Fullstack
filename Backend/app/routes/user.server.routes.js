
const   users = require('../controllers/user.controller');
const auth= require('../../library/middleware');
module.exports = function(app){

    
    
    app.route('/users')
    .post(users.register);

    app.route('/login')
    .post(users.login);

   

    app.route('/logout')
    .post(auth.isAuthenticated,users.logout);
};