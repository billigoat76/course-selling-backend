// middleware for handling auth
const {Admin}  = require('../db/index');

function adminMiddleware(req,res,next){
    // implementing the admin auth logic
    // need to check the headers and validate the admin from the admin DB

    const username = req.headers.username;
    const password = req.headers.password;
    Admin.findOne({
        username : username,
        password : password
    }).then(function(admin){
        if(admin){
            next();
        }else{
            res.status(403).send({error : 'Unauthorized'})
        }
    })


}