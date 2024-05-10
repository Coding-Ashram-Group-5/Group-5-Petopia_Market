import mongoose from 'mongoose';

export interface IComment {
  _id: mongoose.Schema.Types.ObjectId;
  comment: String;
  owner: mongoose.Schema.Types.ObjectId;
  blogId: mongoose.Schema.Types.ObjectId;
}

type ICommentModel = mongoose.Model<IComment>;

const commentSchema: mongoose.Schema<IComment> = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'Comment Content is Required'],
      trim: true,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    blogId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Blog',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const commentModel: ICommentModel = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default commentModel;
