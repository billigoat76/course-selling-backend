
const mongoose = require('mongoose');


// Connect to MongoDB
mongoose.connect('mongodb+srv://vaibhavtanwar99:ilovemummy99@cluster0.d246a.mongodb.net/');

// Define schmeas for the database

const AdminSchema = mongoose.Schema({
    username : String,
    password : String
});

const userSchema = mongoose.Schema({
    username : String,
    password : String,
    purchasedCourses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    }]
})

const courseSchema = mongoose.Schema({
    title : String,
    description : String,
    imageLink : String,
    price : Number,
})


const Admin = mongoose.model('Admin','AdminSchema');
const User = mongoose.model('User','userSchema');
const Course = mongoose.model('Course','courseSchema');

module.exports = {
    Admin,
    User,
    Course
}