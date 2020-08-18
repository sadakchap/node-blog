const { Router } = require('express');
const router = Router();
const {
  getAllBlogs,
  getBlogById,
  createDummyBlog,
  createBlog,
  saveNewBlog,
  updateBlogById,
  saveUpdateBlogById,
  removeBlogById,
} = require("../controllers/blogController");

router.get('/', getAllBlogs);
router.get('/create', createBlog);
router.get('/add-blog', createDummyBlog);

router.get('/edit/:id', updateBlogById);
router.get('/:id', getBlogById);

router.delete('/:id', removeBlogById);
router.post('/create', saveNewBlog);
router.put('/edit/:id', saveUpdateBlogById);

module.exports = router;