const blogSchema = require('../model/blog.schema');

// ! To check blog exist or not
const isBlogExistOrNot = async (req, res, next) => {
    try {
        const blogs = await blogSchema.find({});

        if (blogs.length == 0 && req.originalUrl != '/blog-setup') {
            res.redirect('/blog-setup');
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {
    isBlogExistOrNot,
}