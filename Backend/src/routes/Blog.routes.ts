//! Remaining Comment Edit

import { Router } from 'express';
import { isAuthenticate } from '../middlewares/isAuth.middleware.js';
import {
  addComment,
  addLikeonBlog,
  createBlog,
  deleteBlogPost,
  editBlogPostById,
  editCommentById,
  getAllBlogs,
  getBlogById,
  removeComment,
  removeLikeFromBlog,
} from '../controllers/Blog.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { redisCacheMiddleware, redisFlush } from '../middlewares/redisCache.middleware.js';

const router: Router = Router();

// Blog Routes
router.route('/create').post(isAuthenticate(false), upload.single('coverImage'), redisFlush, createBlog);

router.route('/all').get(redisCacheMiddleware({ EX: 21600 }), getAllBlogs);
router.route('/:id').get(getBlogById);

router.route('/edit/:id').put(isAuthenticate(false), upload.single('coverImage'), redisFlush, editBlogPostById);
router.route('/delete/:id').delete(isAuthenticate(false), redisFlush, deleteBlogPost);

//Blog Comment Routes
router.route('/comment/:id').post(isAuthenticate(false), redisFlush, addComment);
router.route('/comment/edit/:commentId').patch(isAuthenticate(false), redisFlush, editCommentById);
router.route('/comment/delete/:id/:commentId').delete(isAuthenticate(false), redisFlush, removeComment);

//Blog Like Routes
router.route('/likes/:id').patch(isAuthenticate(false), redisFlush, addLikeonBlog);
router.route('/dislike/:id').patch(isAuthenticate(false), redisFlush, removeLikeFromBlog);

export default router;
