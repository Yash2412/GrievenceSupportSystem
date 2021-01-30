const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://Yash2412:yash2412@cluster0-6rqau.mongodb.net/GrievanceRedressal').then(()=> console.log("Connected to database"))

const schema=new mongoose.Schema({
    username:String,
    name: String,
    password:String,
    email:String,
    college:String,
    image: String,
    department:String,
    isComitte:{type:Boolean,default:false},
    no_of_visit:{type:Number,default:1}
});
const student = mongoose.model('student' , schema);
module.exports =student;
