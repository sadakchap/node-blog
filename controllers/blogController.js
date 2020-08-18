const Blog = require("../models/Blog");
const moment = require("moment");

/**
 * @description GET route for showing all blogs
 * @route   GET /blogs
 */
module.exports.getAllBlogs = async (req, res) => {
  try {
    // const blogs = await (await Blog.find({'status': 'public'}).sort({ createdAt: -1}));
    const blogs = await (await Blog.find().sort({ createdAt: -1}));
    res.render("blogs/all", { title: "All Blogs", blogs, moment });
  } catch (err) {
    console.log("ERROR WHILE RETRIVING LIST OF BLOGS");
    console.log(err);
    res.status(400).json({
      error: "Oops, something went wrong!",
    });
  }
};

/**
 * @description route for getting blog by ID
 * @route   GET /blogs/:id
 */
module.exports.getBlogById = async (req, res) => {
    const id = req.params.id;
    try {
        const blog = await Blog.findById(id);
        res.render('blogs/blogDetail', { title: 'Detail', blog, moment})
    } catch (err) {
        console.log('ERROR WHILE GET BLOG DOCUMENT BY ID');
        console.log(err);
        res.status(400).json({
            error: 'An error occured, try again later!'
        })
    }
};

/**
 * @description route for showing create form blog
 * @route   GET /blogs/create
 */
module.exports.createBlog = (req, res) => {
    res.render('blogs/createForm', { title: 'New Blog' })
}

/**
 * @description route for saving form data in DB
 * @route   POST /blogs/create
 */
module.exports.saveNewBlog = async (req, res) => {
    try {
        const newBlog = Blog(req.body);
        const result = await newBlog.save();
        if(result){
            res.redirect(`/blogs/${newBlog._id}`);
        }
    } catch (err) {
        console.log('ERROR OCCURED WHILE SAVING NEW BLOG');
        console.log(err);
        res.status(400).json({
            error: 'Oops! I dont know what just happened'
        })
    }
};

/**
 * @description route for showing edit form
 * @route   GET /blogs/edit/:id
 */
module.exports.updateBlogById = async(req, res) => {
    const id = req.params.id;
    try {
        const blog = await Blog.findById(id);
        if(blog == null)    res.redirect('/')

        res.render('blogs/edit', { title: 'Update Article', blog});

    } catch (err) {
        console.log('Error while getting blog for edit');
        console.log(err)
        res.status(400).json({
            error: 'can not get blog for updating'
        })
    }
}

/**
 * @description route for saving updated blog data
 * @route   PUT /blogs/edit/:id
 */
module.exports.saveUpdateBlogById = async(req, res) => {

    const id = req.params.id;
    try {
        const blog = await Blog.findByIdAndUpdate(id, req.body);
        if(blog){
            res.redirect(`/blogs/${blog._id}`)
        }
    } catch (err) {
        console.log('error while saving update blog');
        console.log(err);
        res.status(400).json({
            error: 'Sorry, something went wrong!'
        })
    }

}

/**
 * @description route for deleting blog from DB
 * @route   DELETE /blogs/:id
 */
module.exports.removeBlogById = async(req, res) => {
    const id = req.params.id;
    try {
        const response = await Blog.findByIdAndDelete(id)
        if(response){
            res.redirect('/')
        }
    } catch (err) {
        console.log('error in deleting blog');
        console.log(err);
        res.status(400).json({
            error: 'Sorry, something went wrong while deleting blog'
        })
    }
}

module.exports.createDummyBlog = async(req, res) => {
    const newBlog = new Blog({
      title: "My new awesome blog 3",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum repellat voluptatibus a aperiam? Eum sunt quod fugiat ipsum atque voluptatem hic praesentium eaque. Harum reiciendis cum itaque soluta, autem fuga. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum repellat voluptatibus a aperiam? Eum sunt quod fugiat ipsum atque voluptatem hic praesentium eaque. Harum reiciendis cum itaque soluta, autem fuga. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum repellat voluptatibus a aperiam? Eum sunt quod fugiat ipsum atque voluptatem hic praesentium eaque. Harum reiciendis cum itaque soluta, autem fuga. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum repellat voluptatibus a aperiam? Eum sunt quod fugiat ipsum atque voluptatem hic praesentium eaque. Harum reiciendis cum itaque soluta, autem fuga. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum repellat voluptatibus a aperiam? Eum sunt quod fugiat ipsum atque voluptatem hic praesentium eaque. Harum reiciendis cum itaque soluta, autem fuga.",
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
}
