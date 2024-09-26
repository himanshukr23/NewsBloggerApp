// !All dependencies
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// ! requires
const isBlogExist = require('./middelware/blogExist');
const adminRouter = require('./routes/admin.route');
const userRouter = require('./routes/user.route');
const blogRouter = require('./routes/blog.route');

// !Temporary
// const bodyParser = require('body-parser');
const session = require('express-session');
const sessionSecretKey = process.env.SESSION_SECRET_KEY;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: sessionSecretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}))


//!Trigger or Global mount 
app.use(isBlogExist.isBlogExistOrNot);
app.use('/', adminRouter);
app.use('/', userRouter);
app.use('/', blogRouter)

// ! Root Route
app.get('/', (req, res) => {
    res.send("This is NewsBlogger project");
});
//!Mongoose connection  
const database_Url = process.env.DATABASE_URL;
const dbName = 'newzBloggerApp';
mongoose.connect(database_Url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
    console.log('Connected to MongoDB with dbName', dbName);
});

//!Port running 
const PORTNo = process.env.PORT_NO;
app.listen(PORTNo, () => {
    console.log(`Server started at PORT No ${PORTNo}`);
});
