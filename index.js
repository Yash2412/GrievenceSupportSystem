const express = require('express');
const app = express();
const bp = require('body-parser');
const passport = require("passport");
const cookieSession = require('cookie-session');
app.use(bp.urlencoded());
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['jfdkhsfhkdhfdhkshfjhsdfhsdhkfjshfjhkks']
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('./Template'))

const loggedInUser = require('./routes/UserSession');
const get = require('./routes/Detail');
const add = require('./routes/Add');
const upvote=require('./routes/upvote');
const studentfeed=require('./routes/Feed');
const mycmpln=require('./routes/mycomplain');
const response=require('./routes/response');

//const psCom=require('./routes/pasportComm');
const auth=require('./routes/passport');
app.use('/api/get', get);
app.use('/api/add', add);
app.use('/user', loggedInUser);
app.use('/auth', auth);
// app.use('/login' ,psCom);
app.use('/upvote',upvote);
app.use('/studentfeed',studentfeed);
app.use('/mycomplain',mycmpln);
app.use('/response',response);


app.listen("5000");