const passport = require("passport");
const localStrategy = require('passport-local');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Student = require('../models/Student');
const Comitte = require('../models/Comitte');
const bp=require('body-parser')
router.use(bp.json());

var userStrat = '';
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    if(userStrat === 'student'){
        Student.findById(id).then(user => {
            done(null, user);
        })
    }
    else{
        Comitte.findById(id).then(user => {
            done(null, user);
        })
    }
        
});

//-----------------------------STUDENT LOCAL STRATEGY-----------------------------------
passport.use('student', new localStrategy((username, password, done) => {
    userStrat = 'student';
    Student.findOne({ username: username }).then(
        (user) => {
            if (!user) {
                return done(null, false);
            }
            bcrypt.compare(password, user.password).then(isMatch => {
                if(!isMatch)
                    return done(null, false);
                else
                    return done(null, user);
            })
            
        }
    );
}
));


//-----------------------------COMMITTEE LOCAL STRATEGY-----------------------------------
passport.use('comitte', new localStrategy((username, password, done) => {
    userStrat = 'comitte';
    Comitte.findOne({ username: username }).then(
        (user) => {
            if (!user) {
                return done(null, false);
            }
            bcrypt.compare(password, user.password).then(isMatch => {
                if(!isMatch)
                    return done(null, false);
                else
                    return done(null, user);
            })
            
        }
    );
}
));


router.post('/student', passport.authenticate('student'),async (req,res)=> {
    res.status(200).send(req.user);
});

router.post('/comitte', passport.authenticate('comitte'),async (req,res)=> {
    res.status(200).send(req.user);
});



module.exports = router;

