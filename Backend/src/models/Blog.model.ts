import mongoose from 'mongoose';
import { IBlog } from '../types/model/blog.type.js';

const blogSchema: mongoose.Schema<IBlog> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog Title is Required Field'],
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
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    commentType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      required: [true, 'Comment Type is Required Field'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Blog Owner is Required Field'],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);
