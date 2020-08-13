const Blog = require("../models/Blog");
const moment = require("moment");


/**
 * @description GET route for showing all blogs
 * @route   GET /blogs
 */
module.exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1});
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
