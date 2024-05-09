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

const router: Router = Router();

// Blog Routes
router.route('/create').post(isAuthenticate, upload.single('coverImage'), createBlog);

router.route('/all').get(getAllBlogs);
router.route('/:id').get(getBlogById);

router.route('/edit/:id').put(isAuthenticate, upload.single('coverImage'), editBlogPostById);
router.route('/delete/:id').delete(isAuthenticate, deleteBlogPost);

//Blog Comment Routes
router.route('/comment/:id').post(isAuthenticate, addComment);
router.route('/comment/edit/:commentId').patch(isAuthenticate, editCommentById);
router.route('/comment/delete/:id/:commentId').delete(isAuthenticate, removeComment);

//Blog Like Routes
router.route('/likes/:id').patch(isAuthenticate, addLikeonBlog);
router.route('/dislike/:id').patch(isAuthenticate, removeLikeFromBlog);

export default router;
