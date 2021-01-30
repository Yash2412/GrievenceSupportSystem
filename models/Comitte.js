const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://Yash2412:yash2412@cluster0-6rqau.mongodb.net/GrievanceRedressal').then(()=> console.log("Connected to database"))

const schema=new mongoose.Schema({
    username:String,
    name:String,
    detail:String,
    category:String,
    sub_category:String,
    password:String,
    email:String,
    college:String,
    image: String,
    
    isComitte:{type:Boolean,default:true},
});

const comitte = mongoose.model('comitte' , schema);
module.exports =comitte;