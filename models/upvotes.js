const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Yash2412:yash2412@cluster0-6rqau.mongodb.net/GrievanceRedressal').then(()=> console.log("Connected to database"));
const schema=new mongoose.Schema({
    complain_id: mongoose.Schema.Types.ObjectId,
    student_id: mongoose.Schema.Types.ObjectId
});
const Upvotes = mongoose.model('upvotes' , schema);
module.exports =Upvotes;

