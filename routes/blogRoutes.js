const { Router } = require('express');
const router = Router();
const Blog = require('../models/Blog');

router.get('/', async(req, res) => {
    try {
        const blogs = await Blog.find().sort()
        res.render('blogs/all', { title: 'All Blogs', blogs})
    } catch (err) {
        console.log('ERROR WHILE TRIVING LIST OF BLOGS');
        console.log(err);
        res.status(400).json({
            error: 'Oops, something went wrong!'
        });
    }

});

router.get('/add-blog', async(req, res) => {
    const newBlog = new Blog({
        title: 'My new awesome blog',
        description: 'this is a very long description of my interesting blog',
    });
    try {
        const result = await newBlog.save();
        res.status(200).json({
            success: true,
            blog: result
        })
        
    } catch (err) {
        console.log('ERROR WHILE CREATING NEW BLOG DOCUMENT');
        console.log(err);
        res.status(400).json({
          error: "Oops, something went wrong!",
        });
    }

})

module.exports = router;