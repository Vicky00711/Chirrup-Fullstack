const
    
    config = require('../config/config')
    users = require('../app/models/user.models');


const isAuthenticated = function(req, res, next){
  let token = req.get(config.get('authToken'));
  
  users.getIdFromToken(token, (err, id) => {
    if (err || id === null) {
      
      return res.sendStatus(401);
      
    }
    next();
  });
};





module.exports = {
    isAuthenticated: isAuthenticated,
   
   
};