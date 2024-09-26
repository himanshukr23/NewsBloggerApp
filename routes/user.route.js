const express = require('express');
const userRouter = express();
require('dotenv').config();
const userController = require('../controller/user.controller');
// const session = require('express-session');
const adminLoginAuth = require('../middelware/adminLoginAuth');
// const bodyParser = require('body-parser');


// userRouter.use(bodyParser.json());
// userRouter.use(bodyParser.urlencoded({ extended: true }));

userRouter.set('view engine', 'ejs');
userRouter.set('views', './views');
// const sessionSecretKey = process.env.SESSION_SECRET_KEY;

// userRouter.use(session({
//     secret: sessionSecretKey,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true },
// }))
userRouter.use(express.static('public'));
userRouter.get('/login', adminLoginAuth.isLogout, userController.loginLoader);

userRouter.post('/login', userController.verifyLogin);
userRouter.get('/logout', adminLoginAuth.isLogin, userController.logout);

userRouter.get('/profile', userController.profile);

userRouter.get('/forget-password', adminLoginAuth.isLogin, userController.forgetLoad);



module.exports = userRouter