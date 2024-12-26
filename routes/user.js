const {Router} = require('express');
const router = Router();
const userMiddleware = require('../middlewares/userMiddleware');

// user routes
router.post('/signup',async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username,
        password
    })
    res.json({message: 'User created successfully'})
})

// implememt listing all courses
router.get('/courses',async(req,res)=>{
    const allCourses = await Course.find();
    res.json({
        courses : allCourses
    });
})

// implement the course purchase logic
router.post('/courses/:courseId',userMiddleware,async(req,res)=>{
    const courseId = req.params.courseId;
    const username = req.headers.username;
    await User.updateOne({username},{
        "$push" : {
            purchasedCourses : courseId
        }
    })
    res.json({
        message : "Purchase completed successfully"
    })
})



module.exports = router;