const express = require('express');
const adminMiddleware = require('../middlewares/admin');
const {Admin} = require('../db/index');
const router = express.Router();


router.post('/admin',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    // check if user with this username and password exists in database
    Admin.create({
        username,
        password
    }).then(function(){
        res.json({
            message : "User is created successfully in DB"
        })
    }).catch(function(err){
        res.json({
            message : "Error in creating user"
        })
    }

    
})