const express = require('express');
const adminRouter = express();
const adminController = require('../controller/admin.controller');

adminRouter.get('/');

adminRouter.get('/testblog', adminController.blogController);

module.exports = adminRouter;