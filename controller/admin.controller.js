const blogSchema = require('../model/blog.schema');
const user = require('../model/user.schema');
const bcrypt = require('bcrypt');
const Post = require('../model/post.schema');


const securePassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.log(error.message);
    }
}
const blogSetup = async (req, res) => {
    try {
        const blogs = await blogSchema.find({});
        if (blogs.length > 0) {
            res.redirect('/login');

        }
        else {
            res.render('blogSetup');
        }
    } catch (error) {
        console.error('Error fetching blogs:', error.message);
        res.status(500).send('Internal Server Error');
    }
}

const blogSetupSave = async (req, res) => {
    try {
        console.log('File Info', req.file);

        const blog_title = req.body.blog_title;
        const blog_logo = req.file.filename;
        const blog_description = req.body.blog_description;
        const name = req.body.name;
        const email = req.body.email;
        const password = await securePassword(req.body.password);

        const newBlog = new blogSchema({
            blog_title: blog_title,
            blog_logo: blog_logo,
            blog_description: blog_description,
        });

        const saveBlog = await newBlog.save();
        console.log('Blog saved', saveBlog);

        const newUser = new user({
            name: name,
            email: email,
            password: password,
            is_admin: 1
        });

        const savedUser = await newUser.save();
        console.log('User saved', savedUser);

        if (savedUser) {
            res.redirect('/login');
        }
        else {
            res.render('/blogSetup', { message: 'Blog setuphas some problem' });
        }
    } catch (error) {
        console.log(error.message);
    }
}

const dashboard = (req, res) => {
    try {
        res.render('admin/dashboard');
    } catch (error) {
        console.log(error.message);
    }
}


const loadPostDashboard = async (req, res) => {
    try {
        res.render('admin/postDashboard');
    } catch (error) {
        console.log(error.message);
    }
};

const addPost = async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
        });

        const postData = await newPost.save();

        res.render('admin/postDashboard', { message: "Post Added Successfully" })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    blogSetup,
    blogSetupSave,
    dashboard,
    loadPostDashboard,
    addPost,
    securePassword,
}