// ! Remaining Comment Edit

import BlogModel from '../models/Blog.model.js';
import CommentModel, { IComment } from '../models/Comment.model.js';

import { Request, Response } from 'express';
import AsyncHandler from '../utils/AsyncHandler.util.js';
import { APIError } from '../utils/APIError.util.js';
import { APIResponse } from '../utils/APIResponse.util.js';
import { CloudinaryImage, IGetUserAuthInfoRequest } from '../types/model/user.type.js';
import { uploadOnCloudinary } from '../utils/Cloudinary.util.js';
import mongoose, { Types } from 'mongoose';

// Get Details of All Blogs
const getAllBlogs = AsyncHandler(async (req: Request, res: Response) => {
  try {
    const blogs = await BlogModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: '$userDetails',
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'blogId',
          as: 'blogComments',
        },
      },
      {
        $unwind: {
          path: '$blogComments',
          preserveNullAndEmptyArrays: true, // Preserve documents if there are no comments
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'blogComments.owner',
          foreignField: '_id',
          as: 'commentOwner',
        },
      },
      {
        $unwind: {
          path: '$commentOwner',
          preserveNullAndEmptyArrays: true, // Preserve documents if comments don't have owners
        },
      },
      {
        $group: {
          _id: '$_id',
          title: { $first: '$title' },
          content: { $first: '$content' },
          category: { $first: '$category' },
          coverImage: { $first: '$coverImage' },
          userDetails: { $first: '$userDetails' },
          likes: { $first: '$likes' },
          comments: {
            $push: {
              _id: '$blogComments._id',
              comment: '$blogComments.comment',
              owner: '$blogComments.owner',
              blogId: '$blogComments.blogId',
              created_at: '$blogComments.created_at',
              updated_at: '$blogComments.updated_at',
              ownerFirstName: { $ifNull: ['$commentOwner.firstName', null] },
              ownerLastName: { $ifNull: ['$commentOwner.lastName', null] },
            },
          },
        },
      },
      {
        $unset: ['__v', 'userData.password', 'userData.__v', 'userData.refreshToken'],
      },
    ]);

    res.status(200).json(new APIResponse(`There are ${blogs.length} Blogs Available`, 200, blogs));
  } catch (error: any) {
    console.error(error);
    res.status(502).json(new APIError(error?.message || 'Error while Getting all Blogs', 502));
  }
});

// Get Details of Particular Blog
const getBlogById = AsyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(402).json(new APIError('Please Provide Valid Value of Parameter ID', 402));
    }

    // const blogDetails = await BlogModel.findById(id);
    const blogDetails = await BlogModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'userData',
        },
      },
      {
        $unwind: '$userData',
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'blogId',
          as: 'blogComments',
        },
      },
      {
        $unwind: {
          path: '$blogComments',
          preserveNullAndEmptyArrays: true, // Preserve documents if there are no comments
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'blogComments.owner',
          foreignField: '_id',
          as: 'commentOwner',
        },
      },
      {
        $unwind: {
          path: '$commentOwner',
          preserveNullAndEmptyArrays: true, // Preserve documents if comments don't have owners
        },
      },
      {
        $group: {
          _id: '$_id',
          title: { $first: '$title' },
          content: { $first: '$content' },
          category: { $first: '$category' },
          coverImage: { $first: '$coverImage' },
          userData: { $first: '$userData' },
          likes: { $first: '$likes' },
          comments: {
            $push: {
              _id: '$blogComments._id',
              comment: '$blogComments.comment',
              owner: '$blogComments.owner',
              blogId: '$blogComments.blogId',
              created_at: '$blogComments.created_at',
              updated_at: '$blogComments.updated_at',
              ownerFirstName: { $ifNull: ['$commentOwner.firstName', null] },
              ownerLastName: { $ifNull: ['$commentOwner.lastName', null] },
            },
          },
        },
      },
      {
        $unset: ['__v', 'userData.password', 'userData.__v', 'userData.refreshToken'],
      },
    ]);

    if (!blogDetails) {
      return res.status(302).json(new APIError(`Blog Details with Id:${id} Doesn't Exist`, 302));
    }

    res.status(200).json(new APIResponse('Blog Details', 200, blogDetails));
  } catch (error: any) {
    console.error(error);
    res.status(502).json(new APIError(error?.message || 'Error while Getting Blog of Particular Id', 502));
  }
});

const createBlog = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const { title, content, category } = req.body;

    if ([title, content, category].some((attr) => attr?.trim() === '')) {
      return res.status(402).json(new APIError('Required Fields Missing', 402));
    }

    const coverImageLocalPath = req.file?.path;

    if (!coverImageLocalPath) {
      return res.status(402).json(new APIError('CoverImage is Required', 402));
    }

    const cloudinaryUpload = await uploadOnCloudinary(coverImageLocalPath);

    const createBlogPost = await BlogModel.create({
      title,
      content,
      category: category.split(','),
      coverImage: {
        url: cloudinaryUpload?.secure_url,
        publicId: cloudinaryUpload?.public_id,
      },
      owner: req.user?._id,
    });

    if (!createBlogPost) {
      return res.status(502).json(new APIError('Failed to Create a Blog Post', 502));
    }

    res.status(200).json(new APIResponse('Blog Post Created Successfully', 200, createBlogPost));
  } catch (error: any) {
    console.error(error);
    res.status(502).json(new APIError(error?.message || 'Error while Creating a Blog', 502));
  }
});

const deleteBlogPost = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(402).json(new APIError('Parameter ID is Missing'));
    }

    const isBlogPostExist = await BlogModel.findById(id);

    if (!isBlogPostExist) {
      return res.status(402).json(new APIError(`Blog Post Doesn't Exist with Given Id:${id}`, 402));
    }

    if (req?.user?._id != String(isBlogPostExist?.owner)) {
      return res.status(402).json(new APIError('only Owner Can Delete the Post', 402));
    }

    const deleteBlogPost = await BlogModel.findByIdAndDelete(id);

    const deleteComments = await CommentModel.deleteMany({
      blogId: id,
    });

    if (!deleteComments) {
      return res.status(502).json(new APIError('Failed to Delete Comments on Blog Delete', 502));
    }

    res.status(200).json(new APIResponse('Blog Post Deleted Successfully', 200, deleteBlogPost));
  } catch (error: any) {
    console.error(error);
    res.status(502).json(new APIError(error?.message || 'Error while Deleting Blog with Id', 502));
  }
});

const editBlogPostById = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  let newCoverImage: CloudinaryImage;
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(402).json(new APIError('Required Parameter Id is Missing', 402));
    }

    const isBlogExist = await BlogModel.findById(id);

    if (!isBlogExist) {
      return res.status(402).json(new APIError(`Blog Doesn't Exist with Id:${id}`, 402));
    }

    if (String(isBlogExist?.owner) != req.user?._id) {
      return res.status(402).json(new APIError('only Writer Can Change Details of Blog'));
    }

    const { title, content, category } = req.body;

    if ([title, content, category].some((attr) => attr?.trim() === '')) {
      return res.status(402).json(new APIError('Required Fields Missing', 402));
    }

    const coverImageLocalPath = req.file?.path;

    newCoverImage = isBlogExist?.coverImage;

    if (coverImageLocalPath) {
      const response = await uploadOnCloudinary(coverImageLocalPath);
      if (response) newCoverImage = { url: response?.secure_url, publicId: response?.public_id };
    }

    const updateDetailsofBlog = await BlogModel.findByIdAndUpdate(id, {
      title,
      content,
      category: category?.split(','),
      coverImage: newCoverImage,
    });

    res.status(200).json(new APIResponse('Blog Details Updated Successfully', 200, updateDetailsofBlog));
  } catch (error: any) {
    console.error(error);
    res.status(502).json(new APIError(error?.message || 'Error while Deleting Blog with Id', 502));
  }
});

const addLikeonBlog = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!id) {
      return res.status(402).json(new APIError('Required Parameter Id is Missing', 402));
    }

    if (!userId) {
      return res.status(402).json(new APIError('Authentication Required', 402));
    }

    const isBlogExist = await BlogModel.findById(id);

    if (!isBlogExist) {
      return res.status(302).json(new APIError(`Blog Doesn't Exist with Id:${id}`, 402));
    }

    if (isBlogExist.likes?.includes(userId)) {
      return res.status(402).json(new APIError('Blog is Already Liked by You'));
    }

    const isLikeAdded = await isBlogExist.addLike(userId);

    if (!isLikeAdded) {
      return res.status(502).json(new APIError('Failed to Add Like', 502));
    }

    res.status(200).json(new APIResponse('Like Added Successfully', 200, isLikeAdded));
  } catch (error: any) {
    console.error(error);
    res.status(502).json(new APIError(error?.message || 'Error while Adding Like on Blog', 502));
  }
});

const removeLikeFromBlog = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!id) {
      return res.status(402).json(new APIError('Required Parameter Id is Missing', 402));
    }

    if (!userId) {
      return res.status(402).json(new APIError('Authentication Required', 402));
    }

    const isBlogExist = await BlogModel.findById(id);

    if (!isBlogExist) {
      return res.status(302).json(new APIError(`Blog Doesn't Exist with Id:${id}`, 402));
    }

    if (!isBlogExist.likes?.includes(userId)) {
      return res.status(302).json(new APIError('Please Like on Blog First', 402));
    }

    const isLikeRemoved = await isBlogExist.removeLike(userId);

    if (!isLikeRemoved) {
      return res.status(502).json(new APIError('Failed to Add Like', 502));
    }

    res.status(200).json(new APIResponse('Like Removed Successfully', 200, isLikeRemoved));
  } catch (error: any) {
    console.error(error);
    res.status(502).json(new APIError(error?.message || 'Error while Removing Like from Blog', 502));
  }
});

const addComment = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    if (!comment) {
      return res.status(402).json(new APIError('Comment is Required', 402));
    }

    if (!id) {
      return res.status(402).json(new APIError('Required Parameter Id is Missing', 402));
    }

    const isBlogExist = await BlogModel.findById(id);

    if (!isBlogExist) {
      return res.status(302).json(new APIError(`Blog Doesn't Exist with Id:${id}`, 402));
    }

    const newComment = await CommentModel.create({
      owner: req.user?._id,
      blogId: id,
      comment,
    });

    if (!newComment) {
      return res.status(502).json(new APIError('Failed to Add Comment on Blog', 502));
    }

    await isBlogExist.addComment(newComment); // Use the addComment method on BlogModel

    res.status(200).json(new APIResponse('Comment Added Successfully', 200, newComment));
  } catch (error: any) {
    console.error(error);
    res.status(502).json(new APIError(error?.message || 'Error while Adding Comment on Blog', 502));
  }
});

const removeComment = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const { id, commentId } = req.params;

    if (!commentId) {
      return res.status(402).json(new APIError('Required Parameters Id and CommentId are Missing', 402));
    }

    if (!id) {
      return res.status(402).json(new APIError('Required Parameter Id is Missing', 402));
    }
    const isBlogExist = await BlogModel.findById(id);

    if (!isBlogExist) {
      return res.status(302).json(new APIError(`Blog Doesn't Exist with Id:${id}`, 402));
    }

    const deleteComment = await CommentModel.findByIdAndDelete(commentId);

    const isCommentDeleted = await isBlogExist.removeComment(commentId); // Use the removeComment method on BlogModel

    if (!isCommentDeleted || !deleteComment) {
      return res.status(502).json(new APIError('Failed to Delete Comment', 502));
    }

    res.status(200).json(new APIResponse('Comment Deleted Successfully', 200, isCommentDeleted));
  } catch (error: any) {
    console.error(error);
    res.status(502).json(new APIError(error?.message || 'Error while Deleting Comment', 502));
  }
});

const editCommentById = AsyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    let { commentId } = req.params;
    const { comment } = req.body;

    if (!commentId || !comment) {
      return res.status(402).json(new APIError('Required Parameters CommentId and Updated Comment are Missing', 402));
    }

    const commentDetails = await CommentModel.findById(commentId);

    if (!commentDetails) {
      return res.status(404).json(new APIError(`Comment with ID:${commentId} Not Found`, 404));
    }

    if (String(commentDetails.owner) != req.user?._id) {
      return res.status(403).json(new APIError('You are not authorized to edit this comment', 403));
    }

    const isCommentUpdated = await CommentModel.findByIdAndUpdate(commentId, {
      comment: comment,
    });

    if (!isCommentUpdated) {
      return res.status(403).json(new APIError('Failed to Update Comment', 403));
    }

    res.status(200).json(new APIResponse('Comment Updated Successfully', 200, isCommentUpdated));
  } catch (error: any) {
    console.error(error);
    res.status(500).json(new APIError(error?.message || 'Error while Editing Comment', 500));
  }
});

export {
  getAllBlogs,
  getBlogById,
  createBlog,
  deleteBlogPost,
  editBlogPostById,
  addComment,
  editCommentById,
  addLikeonBlog,
  removeLikeFromBlog,
  removeComment,
};
