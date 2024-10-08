const express = require('express');
const adminRouter = express();
const adminController = require('../controller/admin.controller');
const adminLoginAuth = require('../middelware/adminLoginAuth');

const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

// !Body-parser,Multer,ejs
adminRouter.use(bodyParser.json());
adminRouter.use(bodyParser.urlencoded({ extended: true }));

adminRouter.set('view engine', 'ejs');
adminRouter.set('views', './views');

adminRouter.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../public/images');
        cb(null, uploadPath);

    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);

    }
});
const upload = multer({ storage: storage });


adminRouter.post('/blog-setup', upload.single('blog_logo'), adminController.blogSetupSave);
adminRouter.get('/blog-setup', adminController.blogSetup);
adminRouter.get('/');

adminRouter.get('/dashboard', adminLoginAuth.isLogin, adminController.dashboard);
adminRouter.get('/create-post', adminLoginAuth.isLogin, adminController.loadPostDashboard);
adminRouter.post('/create-post', adminLoginAuth.isLogin, adminController.addPost);

module.exports = adminRouter;