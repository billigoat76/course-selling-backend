// middleware for handling auth
const secret = require('../config');
const jwt = require('jsonwebtoken');

function adminMiddleware(req,res,next){
    // implementing the admin auth logic
    // need to check the headers and validate the admin from the admin DB

    const token = req.headers.authorization;
    const words = token.split(' ');
    const tokenValue = words[1];
    
    const decodedValue = jwt.verify(tokenValue,secret);
    if(decodedValue.username){
        next();
    }
    else{
        res.status(403).json({
            msg : "You are not authenticated"
        })
    }

}

module.exports = adminMiddleware;