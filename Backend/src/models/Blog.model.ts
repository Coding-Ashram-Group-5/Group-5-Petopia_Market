import mongoose from 'mongoose';
import { IBlog, IBlogModel } from '../types/model/blog.type.js';
import { IComment } from './Comment.model.js';

const blogSchema: mongoose.Schema<IBlog> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog Title is Required Field'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Blog Content is Required Field'],
    },
    coverImage: {
      publicId: {
        type: String,
        default: '',
      },
      url: {
        type: String,
        default: '',
      },
    },
    category: [
      {
        type: String,
        required: [true, 'Blog Category is Required Field'],
        trim: true,
      },
    ],
    likes: [
      {
        type: String,
        default: '',
      },
    ],
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment',
      },
    ],
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

blogSchema.methods.addLike = async function (userId: string): Promise<boolean | null> {
  if (!userId) {
    return false;
  }

  this.likes.push(userId);
  this.save();

  return true;
};

blogSchema.methods.removeLike = async function (userId: string) {
  if (!userId) {
    return false;
  }

  const initialLength = this.likes.length;

  // Filter out the userId from the likes array
  this.likes = this.likes.filter((like: string) => like != userId);

  // If the length changed, it means a like was removed
  if (this.likes.length !== initialLength) {
    await this.save(); // Await the save operation
    return true;
  } else {
    return false; // User hasn't liked the blog
  }
};

blogSchema.methods.addComment = async function (comment: IComment): Promise<boolean | null> {
  try {
    this.comments.push(comment);
    await this.save();
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
};

blogSchema.methods.removeComment = async function (commentId: string): Promise<boolean | null> {
  try {
    const initialLength = this.comments.length;
    this.comments = this.comments.filter((comment: IComment) => comment.toString() != commentId.toString());

    if (this.comments.length !== initialLength) {
      await this.save();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
const blogModel: IBlogModel = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default blogModel;
