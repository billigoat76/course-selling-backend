const express = require('express');
const adminMiddleware = require('../middlewares/admin');
const {Admin, Course} = require('../db/index');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Rss } = require('lucide-react');

router.post('/signup',(req,res)=>{
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
    })

}
)

router.post('/signin',async (req,res)=>{
   const username = req.body.username;
   const password = req.body.password;
   const user = await User.find({
    username,
    password
   })
   if(user){
   const token = jwt.sign({username},secret);
   res.json({
     token});
   }
   else{
    res.status(411).json({
        message : "Incorrect username or password"
    })
   }
})

router.post('/courses',adminMiddleware,async (req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    // supposed to do some input validation

    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    console.log(newCourse);
    res.json({
        message : "Course is created successfully",
        courseId : newCourse._id
    })
})

router.get('/courses',adminMiddleware,async(req,res)=>{
    const allCourses = await Course.find();
    res.json({
        courses : allCourses
    });
})

module.exports = router;