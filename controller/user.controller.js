const userSchema = require('../model/user.schema');
const bcrypt = require('bcrypt');
const randomString = require('random-string');
const nodeMailer = require('nodemailer');
require('dotenv').config();
emailUser = process.env.EMAIL_USER;
emailPassword = process.env.EMAIL_PASSWORD;

const loginLoader = async (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        console.log(error.message);
    }
}

const verifyLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userData = await userSchema.findOne({ email: email });

        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password);
            req.session.user_id = userData._id;
            req.session.is_admin = userData.is_admin

            if (passwordMatch) {
                if (userData.is_admin == 1) {
                    res.redirect('/dashboard');
                } else {
                    res.redirect('/profile');
                }
            } else {
                res.render('login', { message: "Incorrect password" });
            }
        } else {
            res.render('login', { message: "Email-id doesn't exists" });
        }
    } catch (error) {
        console.log(error.message);
    }
}

const profile = (req, res) => {
    try {
        res.send('i am in profile');
    } catch (error) {
        console.log(error.message);
    }
}

const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/login');
    } catch (error) {
        console.log(error.message);
    }
}

const forgetLoad = (req, res) => {
    try {
        res.render('forget-password');
    } catch (error) {
        console.log(error.message);
    }
}
module.exports = {
    loginLoader,
    verifyLogin,
    profile,
    logout,
    forgetLoad,
}