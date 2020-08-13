const { Router } = require('express');
const router = Router();
const { getAllBlogs, getBlogById, createDummyBlog } = require('../controllers/blogController');

router.get('/', getAllBlogs);
router.get('/add-blog', createDummyBlog);

router.get('/:id', getBlogById);


module.exports = router;