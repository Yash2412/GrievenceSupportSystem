const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// const cp = require('cookie-parser');
// router.use(cp());
// const es = require('express-session')
const bp=require('body-parser');

const Comitte = require('../models/Comitte');
const student = require('../models/Student');
const Complain = require('../models/Complain');
//router.use(es({secret:'session'}));


// ------------------------------
// To Add A New Comitte Member
// ------------------------------

router.post('/comitte', async (req, res) => {

    const category = req.body.category;
    const sub_category = req.body.sub_category;
    const uname = req.body.username;
    const name = req.body.name;
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const pswd = await bcrypt.hash(password, salt);
    const email = req.body.email;
    const detail = req.body.detail;
    const college = req.body.college;
    const newMember = new Comitte({
        username: uname,
        category: category,
        sub_category: sub_category,
        name: name,
        password: pswd,
        email: email,
        detail: detail,
        college: college,
    });
    newMember.save(function (err, doc) {
        if (err) throw err;
    });
    res.send('sucesful');
});

// ------------------------------
// To Upload A Student Detail
// ------------------------------

router.post('/student', async (req, res) => {
    console.log(req.body);
    const uname = req.body.username;
    const name = req.body.name;
    const password = req.body.password;
    const department = req.body.department;
    const salt = await bcrypt.genSalt(10);
    const pswd = await bcrypt.hash(password, salt);
    const email = req.body.email;
    const college = req.body.college;
    const newMember = new student({
        username: uname,
        name: name,
        password: pswd ,
        email: email,
        department: department,
        college: college,
    });
    newMember.save(function (err, doc) {
        if (err) throw err;
    });
    res.send('sucesful');
});

router.use(bp.json());
router.post('/complain', async (req, res) => {
    console.log(req.body)
    const user=req.user;
    const subject = req.body.CompainSubject;
    const category = req.body.Category;
    const sub_category = req.body.SubCategory;
    const description = req.body.ComplainDescription;

    const newComplain = new Complain({
        subject: subject,
        category: category,
        sub_category: sub_category,
        name:user.name,
        username: user.username,
        description: description,
        college: user.college,
        //image: imgArray
    });


    newComplain.save(function (err, doc) {
        if (err) throw err;
    });
    return  res.send('sucesful');
});

module.exports = router;
