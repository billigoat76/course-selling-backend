const jwt = require('jsonwebtoken');
const secret = require('../config');
function  userMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const words = token.split(' ');
    const tokenValue = words[1];
    const decodedValue = jwt.verify(tokenValue, secret);
    if(decodedValue.username){
        next();
    }else{
      res.status(403).json({  
        msg: "You are not authenticated"
      });
    }
}

module.exports = userMiddleware;