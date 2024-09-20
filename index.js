// !All dependencies
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// ! requires
const isBlogExist = require('./middelware/blogExist');
const adminRouter = require('./routes/admin.route');

// ! Root Route
app.get('/', (req, res) => {
    res.send("This is NewsBlogger project");
});

//!Trigger or Global mount 
app.use(isBlogExist.isBlogExistOrNot);
app.use('/', adminRouter);

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
