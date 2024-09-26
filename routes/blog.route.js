const express = require('express');
const blogRoutes = express();

blogRoutes.set('view engine', 'ejs');
blogRoutes.set('views', './view');

blogRoutes.use(express.static('public'));

const blogController = require('../controller/blog.controller');

blogRoutes.get('/', blogController.loadBlogs);

blogRoutes.get('/post/:id', blogController.loadPost);

module.exports = blogRoutes;