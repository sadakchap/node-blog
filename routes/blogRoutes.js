const { Router } = require('express');
const router = Router();
const {
  getAllBlogs,
  getBlogById,
  createDummyBlog,
  createBlog,
  saveNewBlog,
} = require("../controllers/blogController");

router.get('/', getAllBlogs);
router.get('/add-blog', createDummyBlog);
router.get('/create', createBlog);
router.post('/create', saveNewBlog);

router.get('/:id', getBlogById);


module.exports = router;